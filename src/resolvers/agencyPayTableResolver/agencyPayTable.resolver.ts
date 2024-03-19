import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { AgencyPayTableInput, AgencyPayTableResponse } from "../../schema/agencyPayTableSchema/agencyPayTable.schema";
import { AgencyPayTableService } from "../../service/agencyPayTableService/agencyPayTable.service";
import mongoose from "mongoose";

@Resolver()
export class AgencyPayTableResolver{
    constructor(private agenPayTableService : AgencyPayTableService){
        this.agenPayTableService = new AgencyPayTableService();
    }

    @Authorized()
    @Mutation(()=>AgencyPayTableResponse)
    upsertAgencyPayTable(@Arg('input') input: AgencyPayTableInput){
        return this.agenPayTableService.upsertAgencyPayTable(input);
    }

    @Authorized()
    @Query(()=>AgencyPayTableResponse)
    getAgencyPayTable(@Arg('agencyId') agencyId:string){
        return this.agenPayTableService.getAgencyPayTable(new mongoose.Types.ObjectId(agencyId));
    }
};