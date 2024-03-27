import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { PayTableInput, PayTableResponse } from "../../schema/payTableSchema/payTable.schema";
import mongoose from "mongoose";
import { CustomerPayTableInput } from "../../schema/customerPayTableSchema/customerPayTable.schema";
import { SitePayTableService } from "../../service/sitePayTableService/sitePayTable.service";
import { SitePayTableInput, SitePayTableResponse } from "../../schema/sitePayTableSchema/sitePayTable.schema";

@Resolver()
export class SitePayTableResolver{
    constructor(private sitePayTableService : SitePayTableService){
        this.sitePayTableService = new SitePayTableService();
    }

    @Authorized()
    @Mutation(()=>SitePayTableResponse)
    upsertSitePayTable(@Arg('input') input: SitePayTableInput){
        return this.sitePayTableService.upsertSitePayTable(input);
    }

    @Authorized()
    @Query(()=>SitePayTableResponse)
    getSitePayTable(@Arg('siteId') siteId:string){
        return this.sitePayTableService.getSitePayTable(new mongoose.Types.ObjectId(siteId));
    }
};