import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BranchObjectService } from "../../service/branchObjectService/branchObject.service";
import { BulkBranchObjectInput, DeleteBranchObjectInput, GenericBranchObjectTypeResponse, branchObjectInput } from "../../schema/branchObjectSchema/branchObject.schema";
import { Context } from "../../utils/context";

@Resolver()
export class BranchObjectResolver{
    constructor(private branchObjectService: BranchObjectService){
        this.branchObjectService = new BranchObjectService();
    }

    @Authorized()
    @Query(()=> GenericBranchObjectTypeResponse)
    getBranchProperty(@Ctx() ctx:Context){
        return this.branchObjectService.branchObject(ctx);
    }

    @Mutation(()=> GenericBranchObjectTypeResponse)
    createBranchObject(@Arg('input', {validate: true}) input: BulkBranchObjectInput){
        return this.branchObjectService.createBranchObject(input);
    }

    @Mutation(()=> GenericBranchObjectTypeResponse)
    updateBranchObjectOrder(@Arg('input', {validate: true}) input: BulkBranchObjectInput){
        return this.branchObjectService.updateBranchObjectOrder(input);
    }

    @Mutation (()=> GenericBranchObjectTypeResponse)
    deleteBranchObject(@Arg('input', {validate: true}) input: DeleteBranchObjectInput){
        return this.branchObjectService.deleteBranchObject(input)
    }
}
