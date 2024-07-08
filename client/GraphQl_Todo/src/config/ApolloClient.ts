import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
    //This link will have the information in what url should we have to make an http connection
uri : 'http://localhost:4000/graphql'
})

const client = new ApolloClient({
link,
cache : new InMemoryCache()
})

export default client;