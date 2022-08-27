import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: false,
          merge(existing, incoming) {
            console.log('inc', incoming);
            console.log('exi', existing);
            if (!incoming) return existing;
            if (!existing) return incoming; // existing will be empty the first time 

            const { links, ...rest } = incoming;

            let result = rest;
            result.links = [...existing.links, ...links]; // Merge existing items with the items from incoming

            return result
          }

        }
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: "https://api.vrmarketing.guru/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;