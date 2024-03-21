import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Branch, BranchFilter, BranchGenericResponse, BranchUpdateInput, Branches, BulkBranchUpdateInput, createBranchInput } from "../../schema/branchSchema/branch.schema";
import { Context } from "../../utils/context";
import mongoose from "mongoose";
import SiteGroupService from "../../service/SiteGroupService/siteGroup.service";
import { BulkSiteGroupUpdateInput, SiteGroup, SiteGroupFilter, SiteGroupGenericResponse, SiteGroupUpdateInput, createSiteGroupInput } from "../../schema/siteGroupSchema/siteGroup.schema";

@Resolver()
export default class SiteGroupResolver {
    constructor(private siteGroupService: SiteGroupService){
        this.siteGroupService = new SiteGroupService()
    }

    @Mutation(()=> SiteGroupGenericResponse)
    createSiteGroup(@Arg('input', {validate: true}) input: createSiteGroupInput){
        return this.siteGroupService.createSiteGroup(input)
    }

    @Authorized()
    @Query(()=>[SiteGroup])
    sitegroups(@Ctx() ctx: Context, @Arg('input', {validate: true}) input: SiteGroupFilter,){
        const customSiteGroup = ctx?.user?.permission?.Branch?.customSiteGroup?.map((siteGroup)=>new mongoose.Types.ObjectId(siteGroup.id));
        return this.siteGroupService.sitegroups(input, customSiteGroup)
    }

    @Query(()=>SiteGroupGenericResponse)
    siteGroup(@Arg('_id') _id: String){
        return this.siteGroupService.siteGroup(_id)
    }

    @Authorized()
    @Mutation(()=>SiteGroupGenericResponse)
    updateSiteGroup(@Ctx() ctx:Context ,@Arg('input', {validate: true}) input:SiteGroupUpdateInput ){
        return this.siteGroupService.updateSiteGroup(input, ctx);
    }

    @Mutation(()=>SiteGroupGenericResponse)
    updateBulkSiteGroup(@Arg('input', {validate:true}) input:BulkSiteGroupUpdateInput){
        return this.siteGroupService.updateBulkSiteGroup(input);
    }

}