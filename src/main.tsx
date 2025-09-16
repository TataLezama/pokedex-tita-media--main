import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import client from './API/ApolloClient';
import { PokemonsApp } from './PokemonsApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
      <PokemonsApp />
  </ApolloProvider>,
)
