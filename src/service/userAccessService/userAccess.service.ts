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

    async getUsersAccessLogByEmpId(employeeId){
        const userLog = await UserAccessModal.find({employeeId: new mongoose.Types.ObjectId(employeeId)});
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

    async logoutAllDevices(employeeId){
        try{
            await UserAccessModal.updateMany({employeeId}, {$set:{isActive: false}}, {multi: true});
            return{
                message: "User all session terminated"
            }
        }
        catch(err){
            return {
                message: err.message,

            }
        }
    }

    async getActiveDevice(userId){
        try{
            const activeDevices = await UserAccessModal.aggregate(
                [
                    {
                        $match: { userId: new mongoose.Types.ObjectId(userId),  isActive: true } // Replace 'your_user_id_here' with the actual userId you're searching for.
                    }                 
                ]
            );
            return activeDevices;
        }catch(err){
            throw new Error(err.message);
        }
    }
}