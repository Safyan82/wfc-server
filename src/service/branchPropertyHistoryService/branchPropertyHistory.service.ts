import dayjs from "dayjs";
import { BranchPropertyHistoryModal } from "../../schema/branchPropertyHistorySchema/branchPropertyHistory.schema"
import mongoose from "mongoose";

export class BranchPropertyHistoryService{
    async createBranchPropertyHistoryRecord(propertyId, value){
        try{
            await BranchPropertyHistoryModal.create({propertyId, value, createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')});
            return true;
        }
        catch(err){
            return false
        }
    }

    async getBranchHistory(propertyId){
        try{
            
            const branchObjectData = await BranchPropertyHistoryModal.aggregate([
                {
                    "$match": {
                        // alert
                        // here i am passing ObjectId from the input I don't know at
                        // the moment why i have to convert type here as well
                        // otherwise it's not working.
                        // ----- Look into this soon ---------
                      "propertyId": new mongoose.Types.ObjectId(propertyId)
                    }
                },
                {
                  $lookup: {
                    from: "properties",
                    localField: "propertyId",
                    foreignField: "_id",
                    as: "propertyDetail"
                  }
                },
                {
                  $unwind: "$propertyDetail"
                },
                {
                  $project: {
                    _id: 1,
                    propertyId: 1,
                    value: 1,
                    createdAt: 1,
                    isReadOnly: 1,
                    isMandatory: 1,
                    order: 1,
                    "propertyDetail.label": 1,
                    "propertyDetail.rules": 1,
                    "propertyDetail.fieldType": 1,
                  }
                },
                
            ]);
            // const branchObjectData = await BranchPropertyHistoryModal.find({propertyId})
            return {success: 1, response: branchObjectData}
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }
}