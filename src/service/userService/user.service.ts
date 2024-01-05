import bcrypt from "bcrypt";
import { userInput, UserModal } from "../../schema/userSchema/user.schema";
import { sign } from "jsonwebtoken";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { UserAccessService } from "../userAccessService/userAccess.service";
import { getLocation } from '../../utils/getUserLocation'
// import { consumer, producer } from "../utils/kafka";

class UserService{

    async newUser(input: userInput){
        try{
            const user = await UserModal.create({...input, createdAt: dayjs()});
              
            return {
                success: 1,
                message: "User Created successfully",
                response: user
            };
        }
        catch(err:any){
            return {
                success: 1,
                message: err.message,
                response: null
            };
        }
    }

    // needs to fully implement
    async verifyPassword(input, ctx){
        try{
            const {employeeId, password} = input;
            const userDetail = await UserModal.aggregate([
                {
                    $match:{
                        employeeId: new mongoose.Types.ObjectId(employeeId)
                    }
                },
                {
                    $lookup:{
                      from: "userroles",
                      localField: "userRole",
                      foreignField: "_id", // Assuming _id is the field in collectionB that matches the object key in collectionA
                      as: "userRolePermission"
                    }
                }
            ]
            );
            const {userAccessType, userRole, permission, _id, userRolePermission} = userDetail[0];

            // log user access
            const userAccessService = new UserAccessService();
            await userAccessService.newAccess({
                ip: ctx?.req.socket.remoteAddress,
                userId: _id,
                employeeId,
                location: "asdd"
                // await getLocation(ctx?.req.socket.remoteAddress)
            })

            const isPasswordVerified= await bcrypt.compare(password, userDetail[0].password);
            if(isPasswordVerified){
                if(userRolePermission?.length>0){
                    const token = sign({ employeeId, userAccessType, role: userRole, permission: userRolePermission[0]?.permission }, process.env.PRIVATEKEY, {expiresIn: "100 days"});
                    return {
                        response: {token , userAccessType, userRole, permission: userRolePermission[0]?.permission, _id, employeeId },
                        message: "User logged in successfully"
                    }

                }else{
                    const token = sign({ employeeId, userAccessType, role: userRole, permission }, process.env.PRIVATEKEY, {expiresIn: "100 days"});
                    return {
                        response: {token , userAccessType, userRole, permission, _id, employeeId },
                        message: "User logged in successfully"
                    }
                }
            }else{
                throw new Error("Password is invaild")
            }
        }catch(err){
            throw new Error("Password is invaild")
        }
    }

    async getAllUserList(){
        try{
            const users = await UserModal.aggregate([
                {
                  $lookup: {
                    from: "employees",
                    localField: "employeeId",
                    foreignField: "_id", // Assuming _id is the field in collectionB that matches the object key in collectionA
                    as: "employee"
                  },
                },
                
                {
                    $lookup: {
                      from: "userroles",
                      localField: "userRole",
                      foreignField: "_id", // Assuming _id is the field in collectionB that matches the object key in collectionA
                      as: "userRole"
                    },
                  }
              ]);
            return{
                response: users,
                message: "All registered users"

            }
        }catch(err){
            return {
                response: null,
                message: err.message
            }
        }
    }

    async updateUser(input){
        try{
            const {_id, employeeId, ...rest} = input;
            const filter = {employeeId: employeeId};
            const update = {$set: {...rest, updatedAt: dayjs()}}
            const updatedUser = await UserModal.updateOne(filter, update);
            return{
                message: "user updated successfully",
                response: updatedUser
            }
        }catch(err){
            return {
                message: err.message,
                response: null,
            }
        }
    }


    async getUserByEmpId(employeeId){
        try{
            const userDetail = await UserModal.aggregate([
                {
                    $match:{
                        employeeId: new mongoose.Types.ObjectId(employeeId)
                    }
                },
                {
                    $lookup:{
                      from: "userroles",
                      localField: "userRole",
                      foreignField: "_id", // Assuming _id is the field in collectionB that matches the object key in collectionA
                      as: "userRolePermission"
                    }
                }
            ]
            );
            const {userAccessType, userRole, permission, _id,} = userDetail[0];
            return{
                response: userDetail,
                message: "Employee's system user detail",
            }
        }catch(err){
            return{
                message: err.message,
                response: null
            }
        }
    }


}

export default UserService;