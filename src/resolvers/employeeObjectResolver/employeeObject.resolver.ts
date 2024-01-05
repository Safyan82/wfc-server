import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { EmployeeObjectService } from "../../service/employeeObjectService/employeeObject.service";
import { BulkEmployeeObjectInput, DeleteEmployeeObjectInput, GenericEmployeeObjectResponse, employeeObjectInput } from "../../schema/employeeObjectSchema/employeeObject.Schema";
import { Context } from "../../utils/context";

@Resolver()
export class EmployeeObjectResolver{
    constructor(private employeeObjectService: EmployeeObjectService){
        this.employeeObjectService = new EmployeeObjectService();
    }

    @Authorized()
    @Query(()=>GenericEmployeeObjectResponse)
    getEmployeeObject(@Ctx() ctx: Context,){
        return this.employeeObjectService.employeeObject(ctx)
    }

    @Mutation(()=> GenericEmployeeObjectResponse)
    bulkCreateEmployeeObject(@Arg('input', {validate: true}) input: BulkEmployeeObjectInput){
        return this.employeeObjectService.createEmployeeObject(input);
    }

    @Mutation(()=> GenericEmployeeObjectResponse)
    bulkUpdateEmployeeObjectOrder(@Arg('input', {validate: true}) input: BulkEmployeeObjectInput){
        return this.employeeObjectService.updateEmployeeObjectOrder(input);
    }

    @Mutation (()=> GenericEmployeeObjectResponse)
    bulkDeleteEmployeeObject(@Arg('input', {validate: true}) input: DeleteEmployeeObjectInput){
        return this.employeeObjectService.deleteEmployeeObject(input)
    }


}