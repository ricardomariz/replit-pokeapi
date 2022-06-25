import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const fetchPokemons = async url => {
    const response = await axios.get(url);
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

  const showFavorites = () => {
    setPokemons(favorites);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const handlePageChange = e => {
    fetchPokemons(
      'https://pokeapi.co/api/v2/pokemon/?offset=' +
        (Number(e.target.text) - 1) * 20,
    );
    setCurrentPage(Number(e.target.text));
  };

  useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon');
  }, []);

  return (
    <main>
      <header>
        <h1>Pokémons Legacy</h1>
      </header>
      <div>{JSON.stringify(favorites)}</div>
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
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </main>
  );
}

export default App;
