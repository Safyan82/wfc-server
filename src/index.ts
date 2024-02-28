import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AuthChecker, buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer} from 'apollo-server-express';
import { resolvers } from './resolvers';
import { connection } from './utils/mongo';
import {PubSub} from 'graphql-subscriptions'
import cors from 'cors'
import { authCheckerMiddleware } from './utils/middleware/authVerification.middleware';
import { Context } from './utils/context';
import jwt from 'jsonwebtoken';
import UserService from './service/userService/user.service';
import { WebSocketServer } from "ws";
import http from 'http';
import bodyParser from 'body-parser';
// import { consumer } from './utils/kafka';


dotenv.config();

async function bootstrap(){

  const authChecker: AuthChecker<Context> = async ({ context }, roles) => {
    // console.log(context.req.headers.authorization.split(" ")[1], context?.user)
    // return !!context.user;
    const token = context?.req?.headers?.authorization?.split(" ")[1] || null; // Extract the token from the cookie (you may use other methods like headers)
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.PRIVATEKEY); // Verify and decode the token
        const  {employeeId} = decoded as any;
        const userService = new UserService();
        const userDetail = await userService.getUserByEmpId(employeeId);
        const {password, ...rest} = userDetail?.response[0];
        context.user = rest; // Attach the decoded user information to the context
        if(roles?.length<1){
          return true;
        }else{
          if(roles.find((role)=>role.toLowerCase()==context.user?.userAccessType.toLowerCase())){
            return true;
          }else{
            return false;
          }
        }
      } catch (err) {
        return false
      }
    }
  
    // // Check if the user has any of the required roles
    // const hasRequiredRoles = roles.some((role) => context.user.roles.includes(role));
    // return hasRequiredRoles;
  };

  // Build Schema
  const schema = await buildSchema({
    resolvers,
    // globalMiddlewares: [authCheckerMiddleware],
    authChecker: authChecker,
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
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
  
  // create apollo server
  const server = new ApolloServer({
    schema,
    context: ({req, res}) :Context => ({req, res}),
    introspection:true,
  });
  
  // start apollo server
  await server.start();

  // apply Express as middleware to apollo server
  server.applyMiddleware({app});

  // create websocket along graphql server side by side
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({ server: httpServer });
  // websocket Implementation 
  wsServer.on('connection', (ws) => {
    // Handle WebSocket connection, messages, etc.
    console.log('WebSocket connection established for');
    ws.on("hello",(arg)=>{
      console.log("Hello triggered", arg);
    });


    ws.on('message', (message, arg2) => {
      console.log('Received:', message);
      // Handle incoming WebSocket messages
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      // Handle connection closure
    });

  });

  // start express server on set port 
  httpServer.listen({port: process.env.PORT}, () => console.log(`server is up on port ${process.env.PORT}`));

  // generate connection on the base of Uri 
  connection();

}

// Bootstrap to server
bootstrap();