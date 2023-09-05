import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { BranchView, BranchViewDefaultResponse, BranchViewInput } from "../../schema/branchView/branchView.schema";
import { BranchViewService } from "../../service/branchViewService/branchView.service";

@Resolver()
export default class BranchViewResolver{

    constructor(private branchViewService : BranchViewService){
        this.branchViewService = new BranchViewService();
    }

    @Mutation(()=>BranchViewDefaultResponse)
    async createBranchView(@Arg('input', {validate: true}) input: BranchViewInput){
        return this.branchViewService.createBranchView(input);
    };

    @Mutation(()=>BranchViewDefaultResponse)
    async updateBranchView(@Arg('input', {validate: true}) input:BranchViewInput){
        return this.branchViewService.updateBranchView(input);
    }

    @Query(()=>[BranchView])
    async branchViews(){
        return this.branchViewService.branchView();
    }

    @Query(()=>BranchView)
    async singlebranchView(@Arg('_id') _id:String){
        return this.branchViewService.singlebranchView(_id);
    }
}