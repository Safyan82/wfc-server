import dayjs from "dayjs";
import { BranchPropertyHistoryModal } from "../../schema/branchPropertyHistorySchema/branchPropertyHistory.schema"
import mongoose from "mongoose";

export class BranchPropertyHistoryService{
    async createBranchPropertyHistoryRecord(propertyId, value, branchId){
        try{
            await BranchPropertyHistoryModal.create({branchId, propertyId, value, createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')});
            return true;
        }
        catch(err){
            return false
        }
    }

    async getBranchHistory(propertyId, branchId){
        try{
            
            const branchObjectData = await BranchPropertyHistoryModal.aggregate([
                {
                    "$match": {
                        $and:[
                          {
                            "propertyId": new mongoose.Types.ObjectId(propertyId),
                            "branchId": new mongoose.Types.ObjectId(branchId)

                          }
                        ]
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