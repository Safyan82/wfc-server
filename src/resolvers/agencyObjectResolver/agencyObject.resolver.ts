import { Context } from "../../utils/context";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AgencyObjectService } from "../../service/agencyObjectService/agencyObject.service";
import { BulkAgencyObjectInput, DeleteAgencyObjectInput, GenericAgencyObjectResponse } from "../../schema/agencyObjectSchema/agencyObject.schema";

@Resolver()
export class AgencyObjectResolver{
    constructor(private agencyObjectService: AgencyObjectService){
        this.agencyObjectService = new AgencyObjectService();
    }

    @Authorized()
    @Query(()=>GenericAgencyObjectResponse)
    getAgencyObject(@Ctx() ctx: Context,){
        return this.agencyObjectService.agencyObject(ctx)
    }

    @Mutation(()=> GenericAgencyObjectResponse)
    bulkCreateAgencyObject(@Arg('input', {validate: true}) input: BulkAgencyObjectInput){
        return this.agencyObjectService.createAgencyObject(input);
    }

    @Mutation(()=> GenericAgencyObjectResponse)
    bulkUpdateAgencyObjectOrder(@Arg('input', {validate: true}) input: BulkAgencyObjectInput){
        return this.agencyObjectService.updateAgencyObjectOrder(input);
    }

    @Mutation (()=> GenericAgencyObjectResponse)
    bulkDeleteAgencyObject(@Arg('input', {validate: true}) input: DeleteAgencyObjectInput){
        return this.agencyObjectService.deleteAgencyObject(input)
    }


}