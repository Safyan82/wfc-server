import { ShiftTypeModal } from "../../schema/shiftTypeSchema/shiftType.schema";

export class ShiftTypeService{

    async newShiftType(input, createdBy){
        try{
            const shiftType = await ShiftTypeModal.create({...input, createdBy});
            return {
                response: shiftType,
                message: "Shift Type created successfully"
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    

    async updateShiftType(input, updatedBy){
        try{
            const {_id, ...rest} = input;
            const shiftTypeUpdated = await ShiftTypeModal.updateOne({_id}, {$set:{...rest, updatedBy}});
            return {
                response: shiftTypeUpdated,
                message: "Shift Type updated successfully",
            }
        }catch(err){
            throw new Error(err.message);
        }
    }
    

    async getShiftType(){
        try{
            const shiftType = await ShiftTypeModal.aggregate([
                {
                    $lookup:{
                        localField: 'payColumn',
                        foreignField: '_id',
                        as: "payColumnDetail",
                        from: "payandbillcolumns",
                    }
                },
                
                {
                    $lookup:{
                        localField: 'billColumn',
                        foreignField: '_id',
                        as: "billColumnDetail",
                        from: "payandbillcolumns",
                    }
                },
                
                {
                    $lookup:{
                        localField: 'summaryShiftTypeId',
                        foreignField: '_id',
                        as: "summaryShiftType",
                        from: "summaryshifttypes",
                    }
                }
            ]);
            return {
                response: shiftType,
                message: "Shift Type fetch successfully"
            }
        }catch(err){
            throw new Error(err.message);
        }
    }


    async deleteShiftType(input){
        try{
            const {_id} = input;
            const shiftType = await ShiftTypeModal.deleteOne({_id});
            return {
                response: shiftType,
                message: "Shift Type deleted successfully",
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    
    

    
}