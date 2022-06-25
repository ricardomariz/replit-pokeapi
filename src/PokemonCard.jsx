import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PokemonCard({
  pokemon,
  setFavorites,
  favorites,
  ...props
}) {
  const [pokemonData, setPokemonData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchPokemon = async url => {
    const response = await axios.get(url);
    setPokemonData(response.data);
    setIsLoaded(true);
  };

  const handleFavorite = e => {
    if (!favorites.includes(pokemon)) {
      setFavorites([...favorites, pokemon]);
    } else {
      setFavorites(
        favorites.filter(favorite => favorite.name !== pokemon.name),
      );
    }
  };

  useEffect(() => {
    fetchPokemon(pokemon.url);
  }, [pokemon]);

  return (
    <div className='pokemon-card'>
      <div className='pokemon-name'>
        <div className='pokemon-fav' onClick={handleFavorite} style={{ cursor: 'pointer' }}>
          {favorites.includes(pokemon) ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>} 
        </div>
        <div className="pokemon-name-text">{pokemon.name}</div>
        
      </div>
      <div className='pokemon-info'>
        <div className='pokemon-image'>
          <img src={pokemonData?.sprites?.front_default} width='150' />
        </div>

        <div className='pokemon-type'>
          {isLoaded &&
            pokemonData.types.map((type, index) => {
              return (
                <div
                  key={index}
                  className={'pokemon-type-name' + ' ' + type.type.name}
                >
                  {type.type.name}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
