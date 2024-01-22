import dayjs from "dayjs"
import mongoose from "mongoose";
import { userRoleInput, userRoleModal } from "../../schema/userRoleSchema/userRole.schema"

export class UserRoleService {
    async newUserRole(input: userRoleInput){
        try{
            
            await userRoleModal.create({...input, createdAt: dayjs()});
            return{
                success: 1,
                message: "User role created successfully",
                response: input
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }

    
    async updateUserRole(input: userRoleInput){
        try{
            const {_id, ...rest} = input;
            await userRoleModal.updateOne({_id},{$set:{...rest, updatedAt: dayjs()}});
            return{
                success: 1,
                message: "User role created successfully",
                response: input
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }

    async userRoleList(){
        try{
            const userRole = await userRoleModal.find();
            return {
                response: userRole,
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }

    async userRoleById(_id){
        try{
            const userRole = await userRoleModal.findOne({_id: new mongoose.Types.ObjectId(_id)});
            return {
                response: userRole,
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }
}