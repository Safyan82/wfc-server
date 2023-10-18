"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./resolvers");
const mongo_1 = require("./utils/mongo");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const cors_1 = __importDefault(require("cors"));
// import { consumer } from './utils/kafka';
dotenv_1.default.config();
async function bootstrap() {
    // Build Schema
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.resolvers,
        // authChecker,
    });
    // Init express
    const app = (0, express_1.default)();
    // create instance of pubsub
    const pubsub = new graphql_subscriptions_1.PubSub();
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
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)());
    // create apollo server
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: (ctx) => console.log(ctx),
        introspection: true,
    });
    // start apollo server
    await server.start();
    // apply Express as middleware to apollo server
    server.applyMiddleware({ app });
    // start express server on set port 
    app.listen({ port: process.env.PORT }, () => console.log(`server is up on port ${process.env.PORT}`));
    // generate connection on the base of Uri 
    (0, mongo_1.connection)();
}
// Bootstrap to server
bootstrap();
