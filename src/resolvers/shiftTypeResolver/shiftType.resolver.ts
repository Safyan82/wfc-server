import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ShiftTypeService } from "../../service/shiftTypeService/shiftType.service";
import { ShiftTypeInput, ShiftTypeResponse } from "../../schema/shiftTypeSchema/shiftType.schema";
import { Context } from "../../utils/context";

@Resolver()
export class ShiftTypeResolver{
    constructor(private shiftTypeService: ShiftTypeService){
        this.shiftTypeService = new ShiftTypeService();
    }

    @Authorized()
    @Mutation(()=>ShiftTypeResponse)
    newShiftType(@Arg('input') input:ShiftTypeInput, @Ctx() ctx:Context){
        return this.shiftTypeService.newShiftType(input, ctx?.user?._id);
    }

    @Authorized()
    @Mutation(()=>ShiftTypeResponse)
    updateShiftType(@Arg('input') input:ShiftTypeInput, @Ctx() ctx:Context){
        return this.shiftTypeService.updateShiftType(input, ctx?.user?._id);
    }

    @Authorized()
    @Mutation(()=>ShiftTypeResponse)
    deleteShiftType(@Arg('input') input:ShiftTypeInput){
        return this.shiftTypeService.deleteShiftType(input);
    }

    @Authorized()
    @Query(()=>ShiftTypeResponse)
    getShiftType(){
        return this.shiftTypeService.getShiftType();
    }
}