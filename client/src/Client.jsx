import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import App from './App'

const link = createHttpLink({
  uri: 'http://localhost:5000',
})

const authLink = setContext(() => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      fields: {
        comments: {
          merge: (existing, incomming) => {
            return [...incomming]
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
})

const Client = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

export default Client
