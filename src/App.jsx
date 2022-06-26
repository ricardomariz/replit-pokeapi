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
  const [perPage, setPerPage] = useState(20);

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
        favorites.slice(
          (currentPage - 1) * perPage,
          (currentPage - 1) * perPage + perPage,
        ),
      );
      setCurrentPage(1);
    } else {
      fetchPokemons(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (currentPage - 1) * perPage
        }&limit=${perPage}`,
      );
    }
  };

  useEffect(() => {
    if (isShowingFavorite) {
      setPokemons(
        favorites.slice(
          (currentPage - 1) * perPage,
          (currentPage - 1) * perPage + perPage,
        ),
      );
      setTotalPokemons(favorites.length);
    } else {
      fetchPokemons(
        `https://pokeapi.co/api/v2/pokemon/?offset=${
          (currentPage - 1) * perPage
        }&limit=${perPage}`,
      );
      setCurrentPage(currentPage);
    }
  }, [currentPage, perPage]);

  useEffect(() => {
    // REPEAT THE CODE FROM LINE 65 - LOOK FOR IMPROVEMENT ON THE CODE
    if (isShowingFavorite) {
      setPokemons(
        favorites.slice(
          (currentPage - 1) * perPage,
          (currentPage - 1) * perPage + perPage,
        ),
      );
      setTotalPokemons(favorites.length);
    }
  }, [favorites]);

  return (
    <main>
      <header>
        <h1>Pokémons Legacy</h1>
      </header>
      <button className='favorite-button' onClick={handleFavorites}>
        {isShowingFavorite ? 'Hide Favorites' : 'Show Favorites'}{' '}
      </button>

      <Paginate
        totalItems={totalPokemons}
        perPage={perPage}
        setPerPage={setPerPage}
        offset={3}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <div className='pokemon-container'>
        {pokemons.length > 0 ? (
          pokemons.map(pokemon => {
            return (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            );
          })
        ) : (
          <p>No pokemons here. Go catch them all!</p>
        )}
      </div>
    </main>
  );
}

export default App;
