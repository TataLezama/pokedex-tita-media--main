import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.pokeapi.co/v1beta2',
  }),
  cache: new InMemoryCache(),
});

export default client;

// query getAllPokemons {
//       pokemon_v2_pokemon(
//         where:  {id: {_lt: 152}}
//         order_by: {id: asc}
//       ) {
//         name
//         id
//         height
//         weight
//         pokemon_v2_pokemontypes {
//           pokemon_v2_type {
//             name
            
//           }
//         }
//         pokemon_v2_pokemonmoves(limit: 2) {
//           pokemon_v2_move {
//             name
//           }
//         }
//         pokemon_v2_pokemonstats {
//           base_stat
//           pokemon_v2_stat {
//             name
//           }
//         }
//         pokemon_v2_pokemonsprites {
//           sprites
//         }
//       }
//     }
