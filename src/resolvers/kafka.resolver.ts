import { Query, Resolver } from "type-graphql";
// import { consumer } from "../utils/kafka";
// import { KafkaMessage, KafkaResponse } from "../schema/kafka.schema";

let msg:string="asd";
// kafka consumer implementation
// consumer.on("message", async (message) => {
//     try {
//     const payload = message;
//     msg="(JSON.stringify())"
//     // pubsub.publish('MESSAGE_RECEIVED', { messageReceived: payload });
//     } catch (error) {
//     console.error('Error processing Kafka message:', error);
//     }
// });

@Resolver()
export default class KafkaResolver{


//     @Query(()=>KafkaResponse)
//     async kafkaConsumer(){
//         let msg;// Consume all messages from Kafka topic
//         await consumer.on('message', (message) => {
//         //   const payload = JSON.parse(message.value);
//             throw new Error(JSON.stringify("asdas"))
//         });

//         await consumer.on('error', (error) => {
//             msg = ("error");
//             throw new Error(JSON.stringify(error))

//         });
// ;
//     }
}