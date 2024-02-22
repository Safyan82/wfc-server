import dayjs from "dayjs";
import { BranchViewInput, BranchViewModal } from "../../schema/branchView/branchView.schema";
import mongoose from "mongoose";

export class BranchViewService {
    async createBranchView(input: BranchViewInput){
        try{
            const branchView = await BranchViewModal.create({...input, createdDate: dayjs().format('YYYY-MM-DD')})
            return {
                response: branchView,
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
            const updatedBranchView = await BranchViewModal.updateOne({_id: input?._id}, {...input, updatedDate: dayjs().format('YYYY-MM-DD')});
            return {
                response : updatedBranchView,
                success: 1,
                message: "View updated successfully",
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async branchView(_id){
        try{
            console.log(_id.toString(), "userId")
            const branchViewResponse = await BranchViewModal.aggregate([
                {
                    $match:{
                     $or:[
                       {createdBy: _id.toString()},
                       {visibility: "public"}
                     ]   
                    }
                }
            ]);
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