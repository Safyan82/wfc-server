import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Branch, BranchFilter, BranchGenericResponse, BranchUpdateInput, Branches, BulkBranchUpdateInput, createBranchInput } from "../../schema/branchSchema/branch.schema";
import BranchService from "../../service/branchService/branch.service";

@Resolver()
export default class BranchResolver {
    constructor(private branchService: BranchService){
        this.branchService = new BranchService()
    }

    @Mutation(()=> BranchGenericResponse)
    createBranch(@Arg('input', {validate: true}) input: createBranchInput){
        return this.branchService.createBranch(input)
    }


    @Query(()=>[Branch])
    branches(@Arg('input', {validate: true}) input: BranchFilter){
        // console.log(input);
        return this.branchService.branches(input)
    }

    @Query(()=>Branch)
    branch(@Arg('_id') _id: String){
        return this.branchService.branch(_id)
    }

    @Mutation(()=>BranchGenericResponse)
    updateBranch(@Arg('input', {validate: true}) input:BranchUpdateInput ){
        return this.branchService.updateBranch(input);
    }

    @Mutation(()=>BranchGenericResponse)
    updateBulkBranch(@Arg('input', {validate:true}) input:BulkBranchUpdateInput){
        return this.branchService.updateBulkBranch(input);
    }

}