import mongoose from "mongoose";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { SiteGroupPayTableService } from "../../service/siteGroupPayTableService/siteGroupPayTable.service";
import { SiteGroupPayTableInput, SiteGroupPayTableResponse } from "../../schema/siteGroupPayTable/siteGroupPayTable.schema";

@Resolver()
export class SiteGroupPayTableResolver{
    constructor(private siteGroupPayTableService : SiteGroupPayTableService){
        this.siteGroupPayTableService = new SiteGroupPayTableService();
    }

    @Authorized()
    @Mutation(()=>SiteGroupPayTableResponse)
    upsertSiteGroupPayTable(@Arg('input') input: SiteGroupPayTableInput){
        return this.siteGroupPayTableService.upsertSiteGroupPayTable(input);
    }

    @Authorized()
    @Query(()=>SiteGroupPayTableResponse)
    getSiteGroupPayTable(@Arg('sitegroupId') sitegroupId:string){
        return this.siteGroupPayTableService.getSiteGroupPayTable(new mongoose.Types.ObjectId(sitegroupId));
    }
};