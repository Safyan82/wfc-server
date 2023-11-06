import { Arg, ID, Query, Resolver } from "type-graphql";
import { BranchPropertyHistoryService } from "../../service/branchPropertyHistoryService/branchPropertyHistory.service";
import { BranchPropertyHistoryInput, BranchPropertyResponse } from "../../schema/branchPropertyHistorySchema/branchPropertyHistory.schema";


@Resolver()
export class BranchPropertyHistoryResolver{
    constructor(private branchPropertyHistoryService : BranchPropertyHistoryService){

        this.branchPropertyHistoryService = new BranchPropertyHistoryService();

    }

    @Query(()=>BranchPropertyResponse)
    getBranchPropHistory(@Arg('input', {validate: true}) input: BranchPropertyHistoryInput){
        return this.branchPropertyHistoryService.getBranchHistory(input.propertyId);
    }
}