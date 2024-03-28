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
    upsertSiteArea(@Arg('id', {nullable: true}) id:string, @Arg('input') input:siteAreaInput){
        return this.siteAreaService.upsertSiteArea(null,input);
    }

    @Query(()=>[SiteArea])
    getSiteAreas(){
        return this.siteAreaService.getSiteAreas();
    }


    @Query(()=>SiteArea)
    getSiteArea(@Arg('id') id:string){
        return this.siteAreaService.getSiteArea(new mongoose.Types.ObjectId(id));
    }

}