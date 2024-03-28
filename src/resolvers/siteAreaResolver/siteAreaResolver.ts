import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { SiteAreaService } from "../../service/siteAreaService/siteArea.service";
import { SiteArea, siteAreaInput } from "../../schema/siteAreaSchema/siteArea.schema";
import mongoose from "mongoose";

@Resolver()
export class SiteAreaResolver{
    constructor(private siteAreaService: SiteAreaService){
        this.siteAreaService = new SiteAreaService();
    }

    @Mutation(()=>SiteArea)
    upsertSiteArea(@Arg('input') input:siteAreaInput){
        return this.siteAreaService.upsertSiteArea(input);
    }

    @Mutation(()=>SiteArea)
    deleteSiteArea(@Arg('input') input:siteAreaInput){
        return this.siteAreaService.deleteSiteArea(input);
    }

    @Query(()=>[SiteArea])
    getSiteAreas(@Arg('siteId') siteId: string){
        return this.siteAreaService.getSiteAreas(new mongoose.Types.ObjectId(siteId));
    }


    @Query(()=>SiteArea)
    getSiteArea(@Arg('id') id:string){
        return this.siteAreaService.getSiteArea(new mongoose.Types.ObjectId(id));
    }

}