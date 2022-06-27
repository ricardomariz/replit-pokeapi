import { useEffect, useState } from 'react';
import api from './services/api';

export default function PokemonCard({
  pokemon,
  setFavorites,
  favorites,
  pokeInfo,
  setPokeInfo,
  ...props
}) {
  const [pokemonData, setPokemonData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchPokemon = async url => {
    setIsLoaded(false);
    const response = await api.get(url);
    setPokemonData(response.data);
    
    setIsLoaded(true);
  };

  const handleFavorite = () => {
    if (!favorites.includes(pokemon)) {
      setFavorites([...favorites, pokemon]);
    } else {
      setFavorites(
        favorites.filter(favorite => favorite.name !== pokemon.name),
      );
    }
  };

  const handlePokeInfo = () => {
    if (!pokeInfo.includes(pokemon.name)) {
      setPokeInfo([...pokeInfo, pokemon.name]);
    } else {
      setPokeInfo(pokeInfo.filter(pokename => pokename !== pokemon.name));
    }
    console.log(pokemonData)
  };

  useEffect(() => {
    fetchPokemon(pokemon.url);
  }, [pokemon]);

  return (
    <div
      className='pokemon-card'
      onClick={handlePokeInfo}
      style={{ cursor: 'pointer' }}
    >
      <div className='pokemon-name'>
        <div className='pokemon-fav' onClick={handleFavorite}>
          {favorites.includes(pokemon) ? (
            <span className='fa fa-star checked'></span>
          ) : (
            <span className='fa fa-star'></span>
          )}
        </div>
        <div className='pokemon-name-text'>{`#${pokemonData.id} ${pokemon.name}`}</div>
      </div>

      <div className='pokemon-info'>
        {pokeInfo.includes(pokemon.name) && (
          <div className='pokemon-stats'>
            Base Stats<hr></hr>
            <ul>
              {isLoaded &&
                pokemonData.stats.map(stat => {
                  return <li>{`${stat.stat.name}: ${stat.base_stat}`}</li>;
                })}
            </ul>
          </div>
        )}
        <div className='pokemon-image' onClick={handlePokeInfo}>
          <img src={pokemonData?.sprites?.front_default} width='150' />
        </div>
        {pokeInfo.includes(pokemon.name) && <div className='pokemon-habilities'>
          Habilities<hr></hr>
          <ul>
            {isLoaded &&
              pokemonData.moves
                .filter(
                  move => move.version_group_details[0].level_learned_at !== 0,
                )
                .map(move => {
                  return (
                    <li>
                      {`${move.move.name}: ${move.version_group_details[0].level_learned_at}`}
                    </li>
                  );
                })}
          </ul>
        </div>}
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
  );
}
