import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BranchField } from "../../schema/branchSchema/branchField.schema";
import BranchFieldService from "../../service/branchService/branchField.service";
import { createBranchInput } from "../../schema/branchSchema/branch.schema";

@Resolver()
export default class BranchFieldResolver {
    constructor(private branchFieldService: BranchFieldService){
        this.branchFieldService = new BranchFieldService();
    }

    @Query(()=>BranchField)
    branchfield(){
         return this.branchFieldService.getBranchField();
    }

    @Mutation(()=>BranchField)
    createBranchField(@Arg('input', {validate:true}) input: createBranchInput){
        return this.branchFieldService.createBranchField(input);
    }
}