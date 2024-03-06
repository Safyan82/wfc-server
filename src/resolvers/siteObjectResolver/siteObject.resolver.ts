import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../utils/context";
import { SiteObjectService } from "../../service/siteObjectSerivce/siteObject.service";
import { BulkSiteObjectInput, DeleteSiteObjectInput, GenericSiteObjectTypeResponse } from "../../schema/siteObjectSchema/siteObject.schema";

@Resolver()
export class SiteObjectResolver{
    constructor(private serviceObjectService: SiteObjectService){
        this.serviceObjectService = new SiteObjectService();
    }

    @Authorized()
    @Query(()=> GenericSiteObjectTypeResponse)
    getSiteObject(@Ctx() ctx:Context){
        return this.serviceObjectService.siteObject(ctx);
    }

    @Mutation(()=> GenericSiteObjectTypeResponse)
    bulkCreateSiteObject(@Arg('input', {validate: true}) input: BulkSiteObjectInput){
        return this.serviceObjectService.createSiteObject(input);
    }

    @Mutation(()=> GenericSiteObjectTypeResponse)
    bulkUpdateSiteObjectOrder(@Arg('input', {validate: true}) input: BulkSiteObjectInput){
        return this.serviceObjectService.updateSiteObjectOrder(input);
    }

    @Mutation (()=> GenericSiteObjectTypeResponse)
    bulkDeleteSiteObject(@Arg('input', {validate: true}) input: DeleteSiteObjectInput){
        return this.serviceObjectService.deleteSiteObject(input)
    }
}
