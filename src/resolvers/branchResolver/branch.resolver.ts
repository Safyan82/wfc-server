import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Branch, Branches, createBranchInput } from "../../schema/branchSchema/branch.schema";
import BranchService from "../../service/branchService/branch.service";

@Resolver()
export default class BranchResolver {
    constructor(private branchService: BranchService){
        this.branchService = new BranchService()
    }

    @Mutation(()=>Branch)
    createBranch(@Arg('input', {validate: true}) input: createBranchInput){
        return this.branchService.createBranch(input)
    }


    @Query(()=>[Branch])
    branches(){
        return this.branchService.branches()
    }

}