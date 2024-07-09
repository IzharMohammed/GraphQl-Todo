import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import serverConfig from './config/serverConfig'; // Server configuration file
import typeDefs from './typeDefs'; // GraphQL type definitions
import resolvers from './resolvers'; // GraphQL resolvers

// Creating a new ApolloServer instance with type definitions and resolvers
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

// Function to start the server and connect to MongoDB
async function start() {    
    try {
        // Attempt to connect to MongoDB using the connection string from the serverConfig file
        await mongoose.connect(serverConfig.DB_URL);
        console.log('Connected to MongoDB'); // Log success message if connected
    } catch (error) {
        console.error('MongoDB connection error:', error); // Log error message if connection fails
    }

    // Start the Apollo Server and log the URL where it's running
    const info = await server.listen();
    console.log(`GraphQL server is up on ${info.url}`);
}

// Call the start function to initialize the server and database connection
start();
