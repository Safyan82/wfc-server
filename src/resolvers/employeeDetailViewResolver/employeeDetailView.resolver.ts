import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EmployeeDetailViewService } from "../../service/employeeDetailViewService/employeeDetailView.service";
import { EmployeeDetailViewInput, EmployeeDetailViewResponse } from "../../schema/employeeDetailViewSchema/employeeDetailView.schema";

@Resolver()
export class EmployeeDetailViewResolver{

    constructor(private employeeDetailViewService : EmployeeDetailViewService){
        this.employeeDetailViewService = new EmployeeDetailViewService();
    }

    @Mutation(()=>EmployeeDetailViewResponse)
    addEmployeeBranchDetailView(@Arg('input', {validate: true}) input: EmployeeDetailViewInput){
        return this.employeeDetailViewService.addEmployeeDetailView(input);
    }

    @Query(()=>EmployeeDetailViewResponse)
    getUserEmployeeDetailView(@Arg('createdBy', {validate:true}) createdBy: String, @Arg('createdFor', {validate:true}) createdFor: String){
        return this.employeeDetailViewService.getEmployeeViewForUser(createdBy,createdFor);
    }
}