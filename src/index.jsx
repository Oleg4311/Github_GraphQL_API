/* eslint-disable no-tabs */
import React from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import App from './components/App'
import './index.css'
import { Provider } from 'react-redux'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_GRAPHQL_API_KEY}`
  },
  cache: new InMemoryCache()
})

const rootContainer = document.querySelector('#root')
const root = createRoot(rootContainer)
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)
