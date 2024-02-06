import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Branch, BranchFilter, BranchGenericResponse, BranchUpdateInput, Branches, BulkBranchUpdateInput, createBranchInput } from "../../schema/branchSchema/branch.schema";
import BranchService from "../../service/branchService/branch.service";
import { Context } from "../../utils/context";
import mongoose from "mongoose";

@Resolver()
export default class BranchResolver {
    constructor(private branchService: BranchService){
        this.branchService = new BranchService()
    }

    @Mutation(()=> BranchGenericResponse)
    createBranch(@Arg('input', {validate: true}) input: createBranchInput){
        return this.branchService.createBranch(input)
    }

    @Authorized()
    @Query(()=>[Branch])
    branches(@Ctx() ctx: Context, @Arg('input', {validate: true}) input: BranchFilter,){
        const customBranch = ctx?.user?.permission?.Branch?.customBranch?.map((branch)=>new mongoose.Types.ObjectId(branch.id));
        return this.branchService.branches(input, customBranch)
    }

    @Query(()=>Branch)
    branch(@Arg('_id') _id: String){
        return this.branchService.branch(_id)
    }

    @Authorized()
    @Mutation(()=>BranchGenericResponse)
    updateBranch(@Ctx() ctx:Context ,@Arg('input', {validate: true}) input:BranchUpdateInput ){
        return this.branchService.updateBranch(input, ctx);
    }

    @Mutation(()=>BranchGenericResponse)
    updateBulkBranch(@Arg('input', {validate:true}) input:BulkBranchUpdateInput){
        return this.branchService.updateBulkBranch(input);
    }

}