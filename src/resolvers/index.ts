import { BranchObjectResolver } from "./branchObjectResolver/branchObject.resolver";
import BranchResolver from "./branchResolver/branch.resolver";
import { GroupResolver } from "./groupResolver/group.resolver";
import KafkaResolver from "./kafka.resolver";
import { PropertiesResolver } from "./propertiesResolver/propertiesResolver";
import UserResolver from "./user.resolver";


export const resolvers = [
    UserResolver, 
    KafkaResolver,
    BranchResolver,
    GroupResolver,
    PropertiesResolver,
    BranchObjectResolver
] as const