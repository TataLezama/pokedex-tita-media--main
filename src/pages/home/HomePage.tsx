import { gql } from "@apollo/client";
import { HeaderApp } from "../../components/HeaderApp";
import Card from "../../components/cards/Card";
import { useQuery } from "@apollo/client/react";

const QUERY_GET_ALL_POKEMONS = gql`
    query getAllPokemons {
      pokemon(
        where: {id: {_lt: 151}}
        order_by: {id: asc}
        limit: 42
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

export const HomePage = () => {
  const { data, loading, error } = useQuery(QUERY_GET_ALL_POKEMONS);

  if (loading) return( 
    <>
      <HeaderApp />
      <div className="list">
        <span className="loading">Loading...</span>
      </div>
    </>
  );
  if (error) return <p>Error :(</p>;
  
  return ( 
    <>
      <HeaderApp />
      <div className="list">
        {
          data.pokemon.map(({ name, id, pokemonsprites}: any) => (
            <Card 
              key={id} 
              number={id} 
              name={name} 
              imageUrl={pokemonsprites[0].sprites.front_default} 
              favorite={false} />
          ))
        }
      </div>
    </>
  )
}
