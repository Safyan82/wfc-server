import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../utils/context";
import mongoose from "mongoose";
import { SiteGroupFilter, createSiteGroupInput } from "../../schema/siteGroupSchema/siteGroup.schema";
import SiteService from "../../service/siteService/site.service";
import { BulkSiteUpdateInput, Site, SiteGenericResponse, SiteUpdateInput, createSiteInput } from "../../schema/siteSchema/site.schema";

@Resolver()
export default class SiteResolver {
    constructor(private siteService: SiteService){
        this.siteService = new SiteService()
    }

    @Mutation(()=> SiteGenericResponse)
    createSite(@Arg('input', {validate: true}) input: createSiteInput){
        return this.siteService.createSite(input)
    }

    @Authorized()
    @Query(()=>[Site])
    sites(@Ctx() ctx: Context, @Arg('input', {validate: true}) input: SiteGroupFilter,){
        // const customSiteGroup = ctx?.user?.permission?.Branch?.customSiteGroup?.map((siteGroup)=>new mongoose.Types.ObjectId(siteGroup.id));
        return this.siteService.sites(input, []);
    }

    @Query(()=>SiteGenericResponse)
    site(@Arg('_id') _id: string){
        return this.siteService.Site(new mongoose.Types.ObjectId(_id))
    }

    @Authorized()
    @Mutation(()=>SiteGenericResponse)
    updateSite(@Ctx() ctx:Context ,@Arg('input', {validate: true}) input: SiteUpdateInput ){
        return this.siteService.updateSite(input, ctx);
    }

    @Mutation(()=>SiteGenericResponse)
    updateBulkSite(@Arg('input', {validate:true}) input:BulkSiteUpdateInput){
        return this.siteService.updateBulkSite(input);
    }

}