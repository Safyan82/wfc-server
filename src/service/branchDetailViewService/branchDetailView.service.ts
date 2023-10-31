import dayjs from "dayjs";
import { BranchDetailViewInput, BranchDetailViewModal } from "../../schema/branchDetailViewSchema/branchDetailView.schema";

export class BranchDetailViewService{

    async addBranchDetailView(input: BranchDetailViewInput){
        try{
            const isExist = await BranchDetailViewModal.findById(input?._id);
            if(isExist &&  input?._id){
                const {createdBy, ...rest} = input;
                await BranchDetailViewModal.updateOne({_id: input?._id}, {...rest, createdAt: dayjs()});
                return {
                    success: 1,
                    message: "Your custom view is updated successfully",
                }
            }else{  
                await BranchDetailViewModal.create({...input, updatedAt: dayjs()});
                return {
                    success: 1,
                    message: "Your custom view is added successfully",
                }
            }
            
        }
        catch(err){
            return{
                success: 0,
                message: err.message,
                response: null
            }
        }
       
    }

    async getBranchViewForUser(createdBy, createdFor){
        try{
            const data = await BranchDetailViewModal.findOne({ $and: [{createdBy}, {createdFor}]});
            return {
                success: 1,
                message: 'Branch view data fields for this user only',
                response: data,
            }
        }
        catch(err){
            return{
                success: 0,
                message: err.message || "an error encountered while reteriving branch view for this user"

            }
        }
    }
}