import React, { useEffect, useState } from 'react';
import api from './services/api';

import PokemonCard from './PokemonCard.jsx';
import Paginate from './Paginate';

import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [pagination, setPagination] = useState({
    prev: null,
    next: null,
  });
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowingFavorite, setIsShowingFavorite] = useState(false);

  const fetchPokemons = async url => {
    const response = await api.get(url);
    setPagination({
      ...pagination,
      prev: response.data.previous,
      next: response.data.next,
    });
    setTotalPokemons(response.data.count);
    setPokemons(
      response.data.results.map(pokemon => {
        const isFav = favorites.find(fav => fav.name === pokemon.name);

        if (isFav) {
          return isFav;
        }

        favorites.includes(pokemon);

        return pokemon;
      }),
    );
  };

  const handleFavorites = () => {
    setIsShowingFavorite(!isShowingFavorite);
    if (!isShowingFavorite) {
      setTotalPokemons(favorites.length);
      setPokemons(
        favorites.slice((currentPage - 1) * 20, (currentPage - 1) * 20 + 20),
      );
    } else {
      fetchPokemons('https://pokeapi.co/api/v2/pokemon');
    }
  };

  const handlePageChange = e => {
    const currentPage = Number(e.target.text);
    if (isShowingFavorite) {
      setPokemons(
        favorites.slice((currentPage - 1) * 20, (currentPage - 1) * 20 + 20),
      );
    } else {
      fetchPokemons(
        'https://pokeapi.co/api/v2/pokemon/?offset=' + (currentPage - 1) * 20,
      );
      setCurrentPage(currentPage);
    }
  };

  useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon');
  }, []);

  return (
    <main>
      <header>
        <h1>Pokémons Legacy</h1>
      </header>
      <button onClick={handleFavorites}>
        {isShowingFavorite ? 'Hide Favorites' : 'Show Favorites'}{' '}
      </button>
      <div className='pokemon-container'>
        {pokemons.map(pokemon => {
          return (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          );
        })}
      </div>

      <Paginate
        totalItems={totalPokemons}
        perPage={20}
        offset={3}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </main>
  );
}

export default App;
