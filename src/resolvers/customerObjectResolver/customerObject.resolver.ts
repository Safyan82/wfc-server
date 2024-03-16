import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BulkEmployeeObjectInput, DeleteEmployeeObjectInput, GenericEmployeeObjectResponse, employeeObjectInput } from "../../schema/employeeObjectSchema/employeeObject.Schema";
import { Context } from "../../utils/context";
import { CustomerObjectService } from "../../service/customerObjectService/customerObject.service";
import { BulkCustomerObjectInput, DeleteCustomerObjectInput, GenericCustomerObjectResponse } from "../../schema/customerObjectSchema/customerobject.schema";
import { BulkCustomerUpdateInput } from "../../schema/customerSchema/customer.schema";

@Resolver()
export class CustomerObjectResolver{
    constructor(private customerObjectService: CustomerObjectService){
        this.customerObjectService = new CustomerObjectService();
    }

    @Authorized()
    @Query(()=>GenericCustomerObjectResponse)
    getCustomerObject(@Ctx() ctx: Context,){
        return this.customerObjectService.customerObject(ctx)
    }

    @Mutation(()=> GenericCustomerObjectResponse)
    bulkCreateCustomerObject(@Arg('input', {validate: true}) input: BulkCustomerObjectInput){
        return this.customerObjectService.createCustomerObject(input);
    }

    @Mutation(()=> GenericCustomerObjectResponse)
    bulkUpdateCustomerObjectOrder(@Arg('input', {validate: true}) input: BulkCustomerObjectInput){
        return this.customerObjectService.updateCustomerObjectOrder(input);
    }

    @Mutation (()=> GenericCustomerObjectResponse)
    bulkDeleteCustomerObject(@Arg('input', {validate: true}) input: DeleteCustomerObjectInput){
        return this.customerObjectService.deleteCustomerObject(input)
    }


}