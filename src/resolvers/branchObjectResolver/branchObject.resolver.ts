import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { BranchObjectService } from "../../service/branchObjectService/branchObject.service";
import { BulkBranchObjectInput, GenericBranchObjectTypeResponse, branchObjectInput } from "../../schema/branchObjectSchema/branchObject.schema";

@Resolver()
export class BranchObjectResolver{
    constructor(private branchObjectService: BranchObjectService){
        this.branchObjectService = new BranchObjectService();
    }

    @Query(()=> GenericBranchObjectTypeResponse)
    getBranchProperty(){
        return this.branchObjectService.branchObject();
    }

    @Mutation(()=> GenericBranchObjectTypeResponse)
    createBranchObject(@Arg('input', {validate: true}) input: BulkBranchObjectInput){
        return this.branchObjectService.createBranchObject(input);
    }
}
