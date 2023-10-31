import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BranchDetailViewInput, BranchDetailViewResponse } from "../../schema/branchDetailViewSchema/branchDetailView.schema";
import { BranchDetailViewService } from "../../service/branchDetailViewService/branchDetailView.service";

@Resolver()
export class BranchDetailViewResolver{

    constructor(private branchDetailViewService : BranchDetailViewService){
        this.branchDetailViewService = new BranchDetailViewService();
    }

    @Mutation(()=>BranchDetailViewResponse)
    addBranchDetailView(@Arg('input', {validate: true}) input: BranchDetailViewInput){
        return this.branchDetailViewService.addBranchDetailView(input);
    }

    @Query(()=>BranchDetailViewResponse)
    getUserBranchView(@Arg('createdBy', {validate:true}) createdBy: String, @Arg('createdFor', {validate:true}) createdFor: String){
        return this.branchDetailViewService.getBranchViewForUser(createdBy,createdFor);
    }
}