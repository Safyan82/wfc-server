import mongoose from "mongoose";
import { Context } from "../../utils/context";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Agency, AgencyFilter, AgencyGenericResponse, AgencyInput, AgencyUpdateInput } from "../../schema/agencySchema/agency.schema";
import AgencyService from "../../service/agencyService/agency.service";

@Resolver()
export class AgencyResolver {
    constructor(private agencyService: AgencyService){
        this.agencyService = new AgencyService()
    }

    @Mutation(()=> AgencyGenericResponse)
    createAgency(@Arg('input', {validate: true}) input: AgencyInput, @Ctx() ctx:Context){
        return this.agencyService.createAgency(input, ctx?.user?._id);
    }

    @Authorized()
    @Query(()=>[Agency])
    agencies(@Ctx() ctx: Context, @Arg('input', {validate: true}) input: AgencyFilter,){
        const customCustomer = ctx?.user?.permission?.Agency?.customAgency?.map((agency)=>new mongoose.Types.ObjectId(agency.id));
      
        return this.agencyService.agencies(input, customCustomer);
    }

    @Query(()=>Agency)
    agency(@Arg('_id') _id: String){
        return this.agencyService.agency(_id)
    }

    @Authorized()
    @Mutation(()=>AgencyGenericResponse)
    updateAgency(@Ctx() ctx:Context ,@Arg('input', {validate: true}) input:AgencyUpdateInput ){
        return this.agencyService.updateAgency(input, ctx);
    }

    @Mutation(()=>AgencyGenericResponse)
    updateBulkAgency(@Arg('input', {validate:true}) input:AgencyUpdateInput){
        return this.agencyService.updateBulkAgency(input);
    }

}