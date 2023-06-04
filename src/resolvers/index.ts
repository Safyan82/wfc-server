import KafkaResolver from "./kafka.resolver";
import UserResolver from "./user.resolver";


export const resolvers = [UserResolver, KafkaResolver] as const