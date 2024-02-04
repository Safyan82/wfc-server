import { SearchModal } from "../../schema/searchSchema/search.schema";
import BranchService from "../branchService/branch.service";
import { EmployeeService } from "../employee/employee.service";

export class SearchService{
    async QueryResult(ctx, input){
        try{
            if(Object.keys(ctx?.user)?.length>0)
            {
                const {searchQuery, filters} = input;
                let SearchResult = [];
                
                // branch Query
                if(filters?.includes("Branch")){

                    const branchService = new BranchService();
                    const branch = await branchService.searchBranch(ctx, searchQuery);
                    if(branch){
                        SearchResult.push({branch});
                    }
                }

                // employee Query
                if(filters?.includes("Employee")){
                    const employeeService = new EmployeeService();
                    const employee = await employeeService.searchEmployee(ctx, searchQuery);
                    if(employee){
                        SearchResult.push({employee});
                    }
                }

                await SearchModal.create({...input, searchBy: ctx?.user?._id});

                return {
                    response: SearchResult?.length>0? SearchResult : [],
                    message: SearchResult?.length>0? "Search Results Are Here." : "No Results Founds.",
                }
            
            }else{
                console.log(Object.keys(ctx?.user))
                return {
                    response: {},
                    message: "Access denied"
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
};