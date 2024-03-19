import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { PayTableInput, PayTableResponse } from "../../schema/payTableSchema/payTable.schema";
import { CustomerPayTableService } from "../../service/customerPayTableService/customerPayTable.service";
import mongoose from "mongoose";
import { CustomerPayTableInput } from "../../schema/customerPayTableSchema/customerPayTable.schema";

@Resolver()
export class CustomerPayTableResolver{
    constructor(private customerPayTableService : CustomerPayTableService){
        this.customerPayTableService = new CustomerPayTableService();
    }

    @Authorized()
    @Mutation(()=>PayTableResponse)
    upsertCustomerPayTable(@Arg('input') input: CustomerPayTableInput){
        return this.customerPayTableService.upsertCustomerPayTable(input);
    }

    @Authorized()
    @Query(()=>PayTableResponse)
    getCustomerPayTable(@Arg('customerId') customerId:string){
        return this.customerPayTableService.getCustomerPayTable(new mongoose.Types.ObjectId(customerId));
    }
};