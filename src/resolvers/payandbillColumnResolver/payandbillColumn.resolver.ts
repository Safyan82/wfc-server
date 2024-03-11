import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { PayandBillColumnService } from "../../service/payandbillColumnService/payandbillColumn.service";
import { PayandBillColumnInput, PayandBillColumnResponse } from "../../schema/payandbillColumnSchema/payandbillColumnSchema";
import { Context } from "../../utils/context";
import mongoose from "mongoose";

@Resolver()
export class PayandBillColumnResolver{
    constructor(private payandbillService: PayandBillColumnService){
        this.payandbillService = new PayandBillColumnService();
    }

    @Authorized()
    @Mutation(()=>PayandBillColumnResponse)
    newPayandBillColumn(@Ctx() ctx:Context, @Arg('input') input:PayandBillColumnInput){
        return this.payandbillService.newPayandBillColumn(input, ctx?.user?._id);
    }

    @Authorized()
    @Mutation(()=>PayandBillColumnResponse)
    updatePayandBillCoulmn(@Ctx() ctx:Context, @Arg('input') input:PayandBillColumnInput){
        return this.payandbillService.updatePayandBillCoulmn(input, ctx?.user?._id);
    }

    @Authorized()
    @Query(()=>PayandBillColumnResponse)
    getPayandBillColumn(){
        return this.payandbillService.getPayandBillColumn();
    }

    
    @Authorized()
    @Mutation(()=>PayandBillColumnResponse)
    deletePayandBillCoulmn(@Arg('id') id:String){
        return this.payandbillService.deletePayandBillCoulmn(new mongoose.Types.ObjectId(id));
    }
    

}