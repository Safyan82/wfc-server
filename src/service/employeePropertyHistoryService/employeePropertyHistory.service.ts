import dayjs from "dayjs";
import mongoose from "mongoose";
import { EmployeePropertyHistoryModal } from "../../schema/employeePropertyHistorySchema/employeePropertyHistory.schema";

export class EmployeePropertyHistoryService{
    async createPropertyHistoryRecord(propertyId, value, employeeId){
        try{
            await EmployeePropertyHistoryModal.create({employeeId, propertyId, value, createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')});
            return true;
        }
        catch(err){
            return false
        }
    }

    async getEmployeeHistory(propertyId, employeeId){
        try{
            
            const branchObjectData = await EmployeePropertyHistoryModal.aggregate([
                {
                    "$match": {
                        $and:[
                          {
                            "propertyId": new mongoose.Types.ObjectId(propertyId),
                            "employeeId": new mongoose.Types.ObjectId(employeeId)

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

    async getEmployeeAllPropHistory(employeeId){
      
      try{
            
        const branchObjectData = await EmployeePropertyHistoryModal.aggregate([
            {
                "$match": {
                    $and:[
                      {
                        "employeeId": new mongoose.Types.ObjectId(employeeId)

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