import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";

type POKEMONS = {
  pokemon: Array<Pokemon>
}

type Pokemon = {
  name: string;
  id: number;
  weight: number;
  height: number;
  pokemontypes: Array<any>;
  pokemonstats: Array<any>;
  pokemonmoves: Array<any>;
  pokemonsprites: Array<any>;
}

type POKEMON_COLOR = {
  pokemoncolor: Array<any>;
}

const POKEMON_COLORS = [
  "black",
  "#6493EB",
  "brown",
  "gray",
  [
    {
      name: "grass",
      color: "#74CB48"
    },
    {
      name: "bug",
      color: "#A7B723"
    }
  ],
  "pink",
  [
    {
      name: "ghost",
      color: "#70559B"
    },
    {
      name: "poison",
      color: "#A43E9E"
    }
  ],
  "#F57D31",
  "white",
  "#F9CF30",
]



export const PokemonPage = () => {
  const { id } = useParams();

  const QUERY_GET_POKEMON_COLOR_BY_ID = gql`
      query getPokemonColorById {
        pokemoncolor (
          where: {
            pokemonspecies:  {
                id:  {
                  _eq: ${Number(id)}
                }
            }
          } limit: 1
        ){
          id
          name
        }
      }
  `;

  const QUERY_GET_POKEMON_BY_ID = gql`
      query getAllPokemons {
        pokemon(
          where: {id: {_eq: ${Number(id)}}}
          order_by: {id: asc}
          limit: 1
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

  const { data: pokemonData, loading: pokemonLoading, error: pokemonError } = useQuery<POKEMONS>(QUERY_GET_POKEMON_BY_ID);
  const { data: pokemonColorData, loading: pokemonColorLoading, error: pokemonColorError } = useQuery<POKEMON_COLOR>(QUERY_GET_POKEMON_COLOR_BY_ID);

  if (pokemonLoading) return <p>Loading...</p>;
  if (pokemonError) return <p>Error :(</p>;

  if (pokemonColorLoading) return <p>Loading...</p>;
  if (pokemonColorError) return <p>Error :(</p>;

  let nextPokemon:number = 0;
  let previousPokemon:number = 0;
  if (id !== undefined && Number(id) > 1) {
    nextPokemon = Number(id) + 1;
    previousPokemon = Number(id) - 1
  } else {
    nextPokemon = Number(id) + 1;
    previousPokemon = 0
  }

  const mainColor = () => {
    if(pokemonColorData && pokemonColorData.pokemoncolor) {
      if (typeof(POKEMON_COLORS[pokemonColorData.pokemoncolor[0].id - 1]) === 'string') {
        return ( 
          POKEMON_COLORS[pokemonColorData.pokemoncolor[0].id - 1]
        );
      } else {
        const colorFind = Object(POKEMON_COLORS[pokemonColorData.pokemoncolor[0].id - 1]).find(
          (color:any) => {
            if (color.name === pokemonData?.pokemon[0].pokemontypes[0].type.name) {
              return color.color;
            }
          });
          return colorFind.color;
      }
    } else {
      return '#DC0A2D';
    }
  }

  console.log(mainColor());

  return (
    <>
      {
        pokemonData && pokemonData.pokemon &&
        <div className="pokemon"
        style={{ backgroundColor: `${mainColor()}` }} >
        <img className="pokemon__img-shadow" src="/assets/images/pokeball.svg" alt="Pokeball" />
        <div className="pokemon__header">
          <a href="/">
            <img src="/assets/images/arrow_back.svg" alt="arrow back" />
          </a>
          <h1>{pokemonData.pokemon[0].name}</h1>
          <span className="pokemon__id">#{pokemonData.pokemon[0].id > 9 ? `0${pokemonData.pokemon[0].id}` : `00${pokemonData.pokemon[0].id}`}</span>
        </div>
        <div className="pokemon__image">
          <img src={pokemonData.pokemon[0].pokemonsprites[0].sprites.front_default} alt={pokemonData.pokemon[0].name} />
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
                pokemonData.pokemon[0].pokemontypes.map((type, index) => (
                  <li key={index} data-id={type.type.id}>{type.type.name}</li>
                ))
              }
            </ul>
          </div>
          <h2 style={{ color: `${mainColor()}` }}>About</h2>
          <div className="pokemon__about">
            <ul>
              <li>
                <div>
                  <img src="/assets/images/weight.svg" alt="Weight" />{pokemonData.pokemon[0].weight} kg
                </div>
                <small>Weight</small>
                </li>
              <li>
                <img src="/assets/images/straighten.svg" alt="Height" />{pokemonData.pokemon[0].height} m
                <small>Height</small>
              </li>
              <li>
                <ul>
                  {
                    pokemonData.pokemon[0].pokemonmoves.map((move, index) => (
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
          <h2 style={{ color: `${mainColor()}` }}>Base Stats</h2>
          <div className="pokemon__stats">
            <ul className="stats">
              <li className="stat">
                <span className="stat__title"
                style={{ color: `${mainColor()}` }}>HP</span>
                <span className="stat__value">{pokemonData.pokemon[0].pokemonstats[0].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ 
                      width: `${pokemonData.pokemon[0].pokemonstats[0].base_stat}%`, 
                      backgroundColor: `${mainColor()}` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title"
                style={{ color: `${mainColor()}` }}>ATK</span>
                <span className="stat__value">{pokemonData.pokemon[0].pokemonstats[1].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ 
                      width: `${pokemonData.pokemon[0].pokemonstats[1].base_stat}%`, 
                      backgroundColor: `${mainColor()}` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title"
                style={{ color: `${mainColor()}` }}>DEF</span>
                <span className="stat__value">{pokemonData.pokemon[0].pokemonstats[2].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ 
                      width: `${pokemonData.pokemon[0].pokemonstats[2].base_stat}%`, 
                      backgroundColor: `${mainColor()}` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title"
                style={{ color: `${mainColor()}` }}>SATK</span>
                <span className="stat__value">{pokemonData.pokemon[0].pokemonstats[3].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ 
                      width: `${pokemonData.pokemon[0].pokemonstats[3].base_stat}%`, 
                      backgroundColor: `${mainColor()}`}}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title" 
                style={{ color: `${mainColor()}` }}>SSDEF</span>
                <span className="stat__value">{pokemonData.pokemon[0].pokemonstats[4].base_stat}</span>
                <span className="stat__bar">
                  <span style={{ 
                      width: `${pokemonData.pokemon[0].pokemonstats[4].base_stat}%`, 
                      backgroundColor: `${mainColor()}` }}></span>
                </span>
              </li>
              <li className="stat">
                <span className="stat__title" 
                style={{ color: `${mainColor()}` }}>SPD</span>
                <span className="stat__value">{pokemonData.pokemon[0].pokemonstats[5].base_stat}</span>
                <span className="stat__bar">
                  <span style={{
                      width: `${pokemonData.pokemon[0].pokemonstats[5].base_stat}%`, 
                      backgroundColor: `${mainColor()}` }}></span>
                </span>
                </li>
            </ul>
          </div>
        </div>
      </div>
      }
    </>
  )
}
