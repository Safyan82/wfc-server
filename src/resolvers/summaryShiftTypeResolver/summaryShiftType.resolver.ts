import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SummaryShiftTypeService } from "../../service/summaryShiftTypeService/summaryShiftType.service";
import { SummaryShiftTypeInput, SummaryShiftTypeResponse } from "../../schema/summaryShiftTypeSchema/summaryShiftType.schema";
import { Context } from "../../utils/context";

@Resolver()
export class SummaryShiftTypeResolver{
    constructor(private summaryShiftTypeService: SummaryShiftTypeService){
        this.summaryShiftTypeService = new SummaryShiftTypeService();
    }

    @Authorized()
    @Mutation(()=>SummaryShiftTypeResponse)
    newSummaryShiftType(@Arg('input') input:SummaryShiftTypeInput, @Ctx() ctx:Context){
        return this.summaryShiftTypeService.newSummaryShiftType(input, ctx?.user?._id);
    }

    @Authorized()
    @Mutation(()=>SummaryShiftTypeResponse)
    updateSummaryShiftType(@Arg('input') input:SummaryShiftTypeInput, @Ctx() ctx:Context){
        return this.summaryShiftTypeService.updateSummaryShiftType(input, ctx?.user?._id);
    }

    @Authorized()
    @Mutation(()=>SummaryShiftTypeResponse)
    deleteSummaryShiftType(@Arg('input') input:SummaryShiftTypeInput, @Ctx() ctx:Context){
        return this.summaryShiftTypeService.deleteSummaryShiftType(input, ctx?.user?._id);
    }

    @Authorized()
    @Query(()=>SummaryShiftTypeResponse)
    getSummaryShiftType(){
        return this.summaryShiftTypeService.getSummaryShiftType();
    }
    
}