import { BranchDetailViewResolver } from "./branchDetailViewResolver/branchDetailView.Resolver";
import { BranchObjectResolver } from "./branchObjectResolver/branchObject.resolver";
import { BranchPropertyHistoryResolver } from "./branchPropertyHistoryResolver/branchPropertyHistory.resolver";
import BranchResolver from "./branchResolver/branch.resolver";
import BranchViewResolver from "./branchViewResolver/branchView.resolver";
import { GroupResolver } from "./groupResolver/group.resolver";
import KafkaResolver from "./kafka.resolver";
import { NoteResolver } from "./noteResolver/note.resolver";
import { PropertiesResolver } from "./propertiesResolver/propertiesResolver";
import UserResolver from "./user.resolver";


export const resolvers = [
    UserResolver, 
    KafkaResolver,
    BranchResolver,
    GroupResolver,
    PropertiesResolver,
    BranchObjectResolver,
    BranchViewResolver,
    NoteResolver,
    BranchDetailViewResolver,
    BranchPropertyHistoryResolver,
] as const