import { BranchDetailViewResolver } from "./branchDetailViewResolver/branchDetailView.Resolver";
import { BranchObjectResolver } from "./branchObjectResolver/branchObject.resolver";
import { BranchPropertyHistoryResolver } from "./branchPropertyHistoryResolver/branchPropertyHistory.resolver";
import BranchResolver from "./branchResolver/branch.resolver";
import BranchViewResolver from "./branchViewResolver/branchView.resolver";
import { EmployeeDetailViewResolver } from "./employeeDetailViewResolver/employeeDetailView.resolver";
import { EmployeeObjectResolver } from "./employeeObjectResolver/employeeObject.resolver";
import { EmployeePropertyHistoryResolver } from "./employeePropertyHistoryResolver/employeePropertyHistory.resolver";
import { EmployeeResolver } from "./employeeResolver/employee.resolver";
import { EmployeeSkillResolver } from "./employeeSkillResolver/employeeSkill.resolver";
import { EmployeeViewResolver } from "./employeeViewResolver/employeeView.resolver";
import { GroupResolver } from "./groupResolver/group.resolver";
import KafkaResolver from "./kafka.resolver";
import { NoteCommentResolver } from "./noteCommentResolver/noteComment.resolver";
import { NoteResolver } from "./noteResolver/note.resolver";
import { PayLevelResolver } from "./payLevelResolver/payLevel.resolver";
import { PayTableResolver } from "./payTableResolver/payTable.resolver";
import { PayandBillColumnResolver } from "./payandbillColumnResolver/payandbillColumn.resolver";
import { PropertiesResolver } from "./propertiesResolver/propertiesResolver";
import { SearchResolver } from "./searchResolver/search.resolver";
import { selectedSearchResolver } from "./selectedSearchResolver/selectedSearch.resolver";
import { SiteGroupObjectResolver } from "./siteGroupObjectResolver/siteGroupObject.resolver";
import SiteGroupResolver from "./siteGroupResolver/siteGroup.resolver";
import { SiteObjectResolver } from "./siteObjectResolver/siteObject.resolver";
import { SkillCategoryResolver } from "./skillCategoryResolver/skillCategory.resolver";
import { SkillResolver } from "./skillResolver/skill.resolver";
import { ThemeResolver } from "./themeResolver/theme.resolver";
import { UserAccessResolver } from "./userAccessResolver/userAccess.resolver";
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
    BranchDetailViewResolver,
    BranchPropertyHistoryResolver,
    EmployeeObjectResolver,
    EmployeeResolver,
    EmployeeViewResolver,
    EmployeeDetailViewResolver,
    EmployeePropertyHistoryResolver,
    UserRoleResolver,
    UserAccessResolver,
    SearchResolver,
    selectedSearchResolver,
    ThemeResolver,
    SkillResolver,
    SkillCategoryResolver,
    EmployeeSkillResolver,
    NoteResolver,
    NoteCommentResolver,
    SiteGroupObjectResolver,
    SiteGroupResolver,
    SiteObjectResolver,
    PayandBillColumnResolver,
    PayLevelResolver,
    PayTableResolver
] as const