import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { PayTableInput, PayTableResponse } from "../../schema/payTableSchema/payTable.schema";
import { CustomerPayTableService } from "../../service/customerPayTableService/customerPayTable.service";

@Resolver()
export class CustomerPayTableResolver{
    constructor(private customerPayTableService : CustomerPayTableService){
        this.customerPayTableService = new CustomerPayTableService();
    }

    @Authorized()
    @Mutation(()=>PayTableResponse)
    upsertCustomerPayTable(@Arg('input') input: PayTableInput){
        return this.customerPayTableService.upsertCustomerPayTable(input);
    }

    @Authorized()
    @Query(()=>PayTableResponse)
    getCustomerPayTable(){
        return this.customerPayTableService.getCustomerPayTable();
    }
};