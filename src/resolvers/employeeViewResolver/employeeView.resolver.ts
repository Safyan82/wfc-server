import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EmployeeViewDefaultResponse, EmployeeViewInput } from "../../schema/employeeViewSchema/employeeView.schema";
import { EmployeeViewService } from "../../service/employeeViewService/employeeView.service";

@Resolver()
export class EmployeeViewResolver{
    constructor(private employeeViewService: EmployeeViewService){
        this.employeeViewService = new EmployeeViewService();
    }

    @Query(()=>EmployeeViewDefaultResponse)
    employeeView(){
        return this.employeeViewService.getEmployeeView();
    }

    @Mutation(()=> EmployeeViewDefaultResponse)
    newEmployeeView(@Arg('input', {validate: true}) input: EmployeeViewInput){
        return this.employeeViewService.newEmployeeView(input)
    }

    @Mutation(()=>EmployeeViewDefaultResponse)
    updateEmployeeView(@Arg('input', {validate: true}) input: EmployeeViewInput){
        return this.employeeViewService.updateEmployeeView(input);
    }


    @Query(()=> EmployeeViewDefaultResponse)
    getSingleEmployeeView(@Arg('_id', {validate: true}) _id: String ){
        return this.employeeViewService.getSingleEmployeeView(_id);
    }

}