import dayjs from "dayjs";
import { BranchViewInput, BranchViewModal } from "../../schema/branchView/branchView.schema";

export class BranchViewService {
    async createBranchView(input: BranchViewInput){
        try{
            await BranchViewModal.create({...input, createdDate: dayjs().format('YYYY-MM-DD')})
            return {
                message: "Branch view created successfully",
                success: 1,
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    };

    async updateBranchView(input){
        try{
            await BranchViewModal.updateOne({_id: input?._id}, {...input, updatedDate: dayjs().format('YYYY-MM-DD')});
            return {
                success: 1,
                message: "View updated successfully",
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async branchView(){
        try{
            const branchViewResponse = await BranchViewModal.find();
            console.log(branchViewResponse);
            return branchViewResponse;
        }
        catch(err){
            throw new Error(err.message);
        }
    };

    async singlebranchView(_id){
        try{
            const singlebranchView = await BranchViewModal.findOne({_id});
            return singlebranchView;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}