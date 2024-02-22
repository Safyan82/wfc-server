import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { EmployeeViewDefaultResponse, EmployeeViewInput } from "../../schema/employeeViewSchema/employeeView.schema";
import { EmployeeViewService } from "../../service/employeeViewService/employeeView.service";
import { Context } from "../../utils/context";

@Resolver()
export class EmployeeViewResolver{
    constructor(private employeeViewService: EmployeeViewService){
        this.employeeViewService = new EmployeeViewService();
    }

    @Authorized()
    @Query(()=>EmployeeViewDefaultResponse)
    employeeView(@Ctx() ctx:Context){
        const {_id} = ctx?.user;
        return this.employeeViewService.getEmployeeView(_id);
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