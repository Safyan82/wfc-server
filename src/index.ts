import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer} from 'apollo-server-express';
import { resolvers } from './resolvers';
import { connection } from './utils/mongo';
import {PubSub} from 'graphql-subscriptions'
import { consumer } from './utils/kafka';


dotenv.config();

async function bootstrap(){

  // Build Schema
  const schema = await buildSchema({
    resolvers,
    // authChecker,
  });

  // Init express
  const app = express();
  
  // create instance of pubsub
  
  const pubsub = new PubSub();

  // // kafka consumer implementation
  // consumer.on("message", async (message) => {
  //   try {
  //     const payload = message;
  //     console.log('Received Kafka message:', payload);
  //     pubsub.publish('MESSAGE_RECEIVED', { messageReceived: payload });
  //   } catch (error) {
  //     console.error('Error processing Kafka message:', error);
  //   }
  // });

  // apply cookie parser as middleware
  app.use(cookieParser());
  
  // create apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx) => console.log(ctx),
    introspection:true,
  });

  // start apollo server
  await server.start();

  // apply Express as middleware to apollo server
  server.applyMiddleware({app});

  // start express server on set port 
  app.listen({port: process.env.PORT}, () => console.log(`server is up on port ${process.env.PORT}`));

  // generate connection on the base of Uri 
  connection();

}

// Bootstrap to server
bootstrap();