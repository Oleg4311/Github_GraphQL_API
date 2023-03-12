/* eslint-disable no-tabs */
import React from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store'
// import dotenv from 'dotenv'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import App from './components/App'
import './index.css'
import { Provider } from 'react-redux'
// console.log('🚀 ~ file: index.jsx:5 ~ dotenv:', dotenv)

// dotenv.config()

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: 'Bearer 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'
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
