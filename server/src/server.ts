import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import serverConfig from './config/serverConfig';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

async function start() {
   // console.log(serverConfig.DB_URL);
    
/*     await mongoose.connect(serverConfig.DB_URL);
    console.log('Connected to mongo db'); */
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }

    const info = await server.listen();
    console.log(`Graph ql server is up on ${info.url}`);
}

start();