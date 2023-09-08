import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

const root = document.getElementById('root') as HTMLElement;
const rootContainer = ReactDOM.createRoot(root);
rootContainer.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
