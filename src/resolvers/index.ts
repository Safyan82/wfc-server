import { BranchDetailViewResolver } from "./branchDetailViewResolver/branchDetailView.Resolver";
import { BranchObjectResolver } from "./branchObjectResolver/branchObject.resolver";
import { BranchPropertyHistoryResolver } from "./branchPropertyHistoryResolver/branchPropertyHistory.resolver";
import BranchResolver from "./branchResolver/branch.resolver";
import BranchViewResolver from "./branchViewResolver/branchView.resolver";
import { EmployeeDetailViewResolver } from "./employeeDetailViewResolver/employeeDetailView.resolver";
import { EmployeeObjectResolver } from "./employeeObjectResolver/employeeObject.resolver";
import { EmployeePropertyHistoryResolver } from "./employeePropertyHistoryResolver/employeePropertyHistory.resolver";
import { EmployeeResolver } from "./employeeResolver/employee.resolver";
import { EmployeeViewResolver } from "./employeeViewResolver/employeeView.resolver";
import { GroupResolver } from "./groupResolver/group.resolver";
import KafkaResolver from "./kafka.resolver";
import { NoteResolver } from "./noteResolver/note.resolver";
import { PropertiesResolver } from "./propertiesResolver/propertiesResolver";
import UserResolver from "./userResolver/user.resolver";
import { UserRoleResolver } from "./userRoleResolver/userRole.resolver";


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
    EmployeeObjectResolver,
    EmployeeResolver,
    EmployeeViewResolver,
    EmployeeDetailViewResolver,
    EmployeePropertyHistoryResolver,
    UserRoleResolver,
] as const