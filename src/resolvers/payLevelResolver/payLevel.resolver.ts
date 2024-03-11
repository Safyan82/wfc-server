import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { PayLevelService } from "../../service/payLevelService/payLevel.service";
import { PayLevelInput, PayLevelResponse } from "../../schema/payLevelSchema/payLevel.schema";
import { Context } from "../../utils/context";
import mongoose from "mongoose";

@Resolver()
export class PayLevelResolver{
    constructor(private payLevelService: PayLevelService){
        this.payLevelService = new PayLevelService();
    }

    @Authorized()
    @Mutation(()=>PayLevelResponse)
    newPayLevel(@Ctx() ctx:Context, @Arg('input') input:PayLevelInput){
        return this.payLevelService.newPayLevel(input, ctx?.user?._id);
    }

    @Authorized()
    @Mutation(()=>PayLevelResponse)
    updatePayLevel(@Ctx() ctx:Context, @Arg('input') input:PayLevelInput){
        return this.payLevelService.updatePayLevel(input, ctx?.user?._id);
    }


    @Authorized()
    @Mutation(()=>PayLevelResponse)
    deletePayLevel(@Arg('id') id:string){
        return this.payLevelService.deletePayLevel(new mongoose.Types.ObjectId(id));
    }

    @Authorized()
    @Query(()=>PayLevelResponse)
    getPayLevel(){
        return this.payLevelService.getPayLevel();
    }


}