import BranchResolver from "./branchResolver/branch.resolver";
import { GroupResolver } from "./groupResolver/group.resolver";
import KafkaResolver from "./kafka.resolver";
import UserResolver from "./user.resolver";


export const resolvers = [
    UserResolver, 
    KafkaResolver,
    BranchResolver,
    GroupResolver,
] as const