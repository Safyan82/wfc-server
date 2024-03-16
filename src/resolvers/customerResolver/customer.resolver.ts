import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../utils/context";
import mongoose from "mongoose";
import CustomerService from "../../service/customerService/customer.service";
import { Customer, CustomerFilter, CustomerGenericResponse, CustomerInput, CustomerUpdateInput } from "../../schema/customerSchema/customer.schema";

@Resolver()
export class CustomerResolver {
    constructor(private customerService: CustomerService){
        this.customerService = new CustomerService()
    }

    @Mutation(()=> CustomerGenericResponse)
    createCustomer(@Arg('input', {validate: true}) input: CustomerInput, @Ctx() ctx:Context){
        return this.customerService.createCustomer(input, ctx?.user?._id);
    }

    @Authorized()
    @Query(()=>[Customer])
    customers(@Ctx() ctx: Context, @Arg('input', {validate: true}) input: CustomerFilter,){
        const customCustomer = ctx?.user?.permission?.Customer?.customCustomer?.map((customer)=>new mongoose.Types.ObjectId(customer.id));
        console.log(customCustomer, "customCustomer");
        return this.customerService.customers(input, customCustomer);
    }

    @Query(()=>Customer)
    customer(@Arg('_id') _id: String){
        return this.customerService.customer(_id)
    }

    @Authorized()
    @Mutation(()=>CustomerGenericResponse)
    updateCustomer(@Ctx() ctx:Context ,@Arg('input', {validate: true}) input:CustomerUpdateInput ){
        return this.customerService.updateCustomer(input, ctx);
    }

    @Mutation(()=>CustomerGenericResponse)
    updateBulkCustomer(@Arg('input', {validate:true}) input:CustomerUpdateInput){
        return this.customerService.updateBulkCustomer(input);
    }

}