import mongoose from "mongoose";
import { UserAccessModal, userAccess } from "../../schema/userAccessSchema/userAccess.schema";

export class UserAccessService{
    async newAccess(input){
        const {_id} = await UserAccessModal.create(input);
        return _id
    }

    async getUsersAccessLog(){
        const userLog = await UserAccessModal.aggregate([
            {
                $lookup:{
                    localField: 'employeeId',
                    foreignField: '_id',
                    as: 'employee',
                    from: 'employees'
                }
            }
        ]);
        return userLog;
    }

    async deactiveSession(_id){
        await UserAccessModal.updateOne({_id},{$set:{isActive: false}});
        return {message:"Deactived Successfully"}
    }

    async currentSessionStatus(_id){
        const {isActive} = await UserAccessModal.findById(new mongoose.Types.ObjectId(_id));
        return isActive;
    }
}