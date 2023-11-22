import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EmployeeObjectService } from "../../service/employeeObjectService/employeeObject.service";
import { BulkEmployeeObjectInput, DeleteEmployeeObjectInput, GenericEmployeeObjectResponse, employeeObjectInput } from "../../schema/employeeObjectSchema/employeeObject.Schema";

@Resolver()
export class EmployeeObjectResolver{
    constructor(private employeeObjectService: EmployeeObjectService){
        this.employeeObjectService = new EmployeeObjectService();
    }

    @Query(()=>GenericEmployeeObjectResponse)
    getEmployeeObject(){
        return this.employeeObjectService.employeeObject()
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