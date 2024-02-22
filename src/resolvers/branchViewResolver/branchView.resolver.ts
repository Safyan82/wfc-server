import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BranchView, BranchViewDefaultResponse, BranchViewInput } from "../../schema/branchView/branchView.schema";
import { BranchViewService } from "../../service/branchViewService/branchView.service";
import { Context } from "../../utils/context";

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

    @Authorized()
    @Query(()=>[BranchView])
    async branchViews(@Ctx() ctx:Context){
        const {_id} = ctx?.user;
        return this.branchViewService.branchView(_id);
    }

    @Query(()=>BranchView)
    async singlebranchView(@Arg('_id') _id:String){
        return this.branchViewService.singlebranchView(_id);
    }
}