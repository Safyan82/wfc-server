import { SummaryShiftTypeModal } from "../../schema/summaryShiftTypeSchema/summaryShiftType.schema";

export class SummaryShiftTypeService{
    async newSummaryShiftType(input, createdBy){
        try{
            const summaryShiftType = await SummaryShiftTypeModal.create({...input, createdBy});
            return{
                response: summaryShiftType,
                message: "Summary Shift Type created successfully",
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    async updateSummaryShiftType(input, updatedBy){
        try{
            const {_id, ...rest} = input;
            const summaryShiftType = await SummaryShiftTypeModal.updateOne({_id}, {$set:{...rest, updatedBy}});
            return{
                response: summaryShiftType,
                message: "Summary Shift Type created successfully",
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    
    async deleteSummaryShiftType(input, updatedBy){
        try{
            const {_id, ...rest} = input;
            const summaryShiftType = await SummaryShiftTypeModal.deleteOne({_id});
            return{
                response: summaryShiftType,
                message: "Summary Shift Type deleted successfully",
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    
    async getSummaryShiftType(){
        try{
            const summaryShiftType = await SummaryShiftTypeModal.find();
            return{
                response: summaryShiftType,
                message: "Summary Shift Type reterived successfully",
            }
        }catch(err){
            throw new Error(err.message);
        }
    }
    
}