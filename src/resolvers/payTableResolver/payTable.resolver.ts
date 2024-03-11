import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { PayTableService } from "../../service/payTable/payTable.service";
import { PayTableInput, PayTableResponse } from "../../schema/payTableSchema/payTable.schema";

@Resolver()
export class PayTableResolver{
    constructor(private payTableService : PayTableService){
        this.payTableService = new PayTableService();
    }

    @Authorized()
    @Mutation(()=>PayTableResponse)
    upsertPayTable(@Arg('input') input: PayTableInput){
        return this.payTableService.upsertPayTable(input);
    }

    @Authorized()
    @Query(()=>PayTableResponse)
    getPayTable(){
        return this.payTableService.getPayTable();
    }
};