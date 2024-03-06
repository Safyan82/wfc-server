import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../utils/context";
import { SiteGroupObjectService } from "../../service/siteGroupObjectService/siteGroupObject.service";
import { BulkSiteGroupObjectInput, DeleteSiteGroupObjectInput, GenericSiteGroupObjectTypeResponse } from "../../schema/siteGroupObjectSchema/siteGroupObject.schema";

@Resolver()
export class SiteGroupObjectResolver{
    constructor(private siteGroupObjectService: SiteGroupObjectService){
        this.siteGroupObjectService = new SiteGroupObjectService();
    }

    @Authorized()
    @Query(()=> GenericSiteGroupObjectTypeResponse)
    getSiteGroupObject(@Ctx() ctx:Context){
        return this.siteGroupObjectService.siteGroupObject(ctx);
    }

    @Mutation(()=> GenericSiteGroupObjectTypeResponse)
    bulkCreateSiteGroupObject(@Arg('input', {validate: true}) input: BulkSiteGroupObjectInput){
        return this.siteGroupObjectService.createSiteGroupObject(input);
    }

    @Mutation(()=> GenericSiteGroupObjectTypeResponse)
    bulkUpdateSiteGroupObjectOrder(@Arg('input', {validate: true}) input: BulkSiteGroupObjectInput){
        return this.siteGroupObjectService.updateSiteGroupObjectOrder(input);
    }

    @Mutation (()=> GenericSiteGroupObjectTypeResponse)
    bulkDeleteSiteGroupObject(@Arg('input', {validate: true}) input: DeleteSiteGroupObjectInput){
        return this.siteGroupObjectService.deleteSiteGroupObject(input)
    }
}
