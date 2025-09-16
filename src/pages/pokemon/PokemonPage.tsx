import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";

export const PokemonPage = () => {
  const { id } = useParams();

  const QUERY_GET_POKEMON_BY_ID = gql`
      query getAllPokemons {
        pokemon(
          where: {id: {_eq: ${Number(id)}}}
          order_by: {id: asc}
          limit: 20
        ) {
          name
          id
          weight
          height
          pokemontypes {
            type {
              id
              name
            }
          }
          pokemonstats {
            base_stat
          }
          pokemonmoves(limit: 3){
            move {
              name
            }
          }
          pokemonsprites {
            sprites
          }
        }
      }
  `;

  const { data, loading, error } = useQuery(QUERY_GET_POKEMON_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let nextPokemon:number = 0;
  let previousPokemon:number = 0;
  if (id !== undefined && Number(id) > 1) {
    nextPokemon = Number(id) + 1;
    previousPokemon = Number(id) - 1
  } else {
    nextPokemon = Number(id) + 1;
    previousPokemon = 0
  }

  console.log(data);

  return (
    <>
      <div className="pokemon">
        <img className="pokemon__img-shadow" src="/assets/images/pokeball.svg" alt="Pokeball" />
        <div className="pokemon__header">
          <a href="/">
            <img src="/assets/images/arrow_back.svg" alt="arrow back" />
          </a>
          <h1>{data.pokemon[0].name}</h1>
          <span className="pokemon__id">#{data.pokemon[0].id > 9 ? `0${data.pokemon[0].id}` : `00${data.pokemon[0].id}`}</span>
        </div>
        <div className="pokemon__image">
          <img src={data.pokemon[0].pokemonsprites[0].sprites.front_default} alt={data.pokemon[0].name} />
          <a
              className={ previousPokemon !== 0 ? "arrow pokemon__button-previous" : "arrow pokemon__button-previous disabled" }
              href={`/pokemon/${previousPokemon}`}
              >
            <img src="/assets/images/chevron_left.svg" alt="previous pokemon" />
          </a>
          <a className="arrow pokemon__button-next" href={`/pokemon/${nextPokemon}`}>
            <img src="/assets/images/chevron_right.svg" alt="next pokemon" />
          </a>
        </div>
        <div className="pokemon__info">
          <div className="pokemon__types">
            <ul>
              {
                data.pokemon[0].pokemontypes.map((type, index) => (
                  <li key={index}>{type.type.name}</li>
                ))
              }
            </ul>
          </div>
          <h2>About</h2>
          <div className="pokemon__about">
            <ul>
              <li>
                <div>
                  <img src="/assets/images/weight.svg" alt="Weight" />{data.pokemon[0].weight} kg
                </div>
                <small>Weight</small>
                </li>
              <li>
                <img src="/assets/images/straighten.svg" alt="Height" />{data.pokemon[0].height} m
                <small>Height</small>
              </li>
              <li>
                <ul>
                  {
                    data.pokemon[0].pokemonmoves.map((move, index) => (
                      <li key={index}>{move.move.name}</li>
                    ))
                  }
                </ul>
                <small>Moves</small>
              </li>
            </ul>
          </div>
          <div className="pokemon__description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <h2>Base Stats</h2>
          <div className="pokemon__stats">
            <ul className="stats">
              <li className="stat">
                <span className="stat__title">HP</span>
                <span className="stat__value">{data.pokemon[0].pokemonstats[0].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ width: `${data.pokemon[0].pokemonstats[0].base_stat}%` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title">ATK</span>
                <span className="stat__value">{data.pokemon[0].pokemonstats[1].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ width: `${data.pokemon[0].pokemonstats[1].base_stat}%` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title">DEF</span>
                <span className="stat__value">{data.pokemon[0].pokemonstats[2].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ width: `${data.pokemon[0].pokemonstats[2].base_stat}%` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title">SATK</span>
                <span className="stat__value">{data.pokemon[0].pokemonstats[3].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ width: `${data.pokemon[0].pokemonstats[3].base_stat}%` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title">SSDEF</span>
                <span className="stat__value">{data.pokemon[0].pokemonstats[4].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ width: `${data.pokemon[0].pokemonstats[4].base_stat}%` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title">SPD</span>
                <span className="stat__value">{data.pokemon[0].pokemonstats[5].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ width: `${data.pokemon[0].pokemonstats[5].base_stat}%` }}></span>
                </span>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
