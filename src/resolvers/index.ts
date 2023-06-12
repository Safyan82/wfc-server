import BranchResolver from "./branch.resolver";
import KafkaResolver from "./kafka.resolver";
import UserResolver from "./user.resolver";


export const resolvers = [
    UserResolver, 
    KafkaResolver,
    BranchResolver,



] as const