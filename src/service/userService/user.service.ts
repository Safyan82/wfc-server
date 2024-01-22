import bcrypt from "bcrypt";
import { userInput, UserModal } from "../../schema/userSchema/user.schema";
import { sign } from "jsonwebtoken";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { UserAccessService } from "../userAccessService/userAccess.service";
import { getLocation } from '../../utils/getUserLocation';
import axios, { AxiosResponse } from 'axios';
import { MailService } from "../mailService/mail.service";
// import { consumer, producer } from "../utils/kafka";

class UserService{

    async newUser(input: userInput){
        try{

            const user = await UserModal.create({...input, createdAt: dayjs()});
            if(!input?.isManualPassword){
                const mail = new MailService();
                await mail.sendMail(input?.email, input?.employeeId);
            }

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
                },
                {
                    $lookup:{
                      from: "employees",
                      localField: "employeeId",
                      foreignField: "_id", // Assuming _id is the field in collectionB that matches the object key in collectionA
                      as: "employeeDetail"
                    }
                }
            ]
            );
            const {userAccessType, userRole, permission, _id, userRolePermission, employeeDetail} = userDetail[0];

            // log user access
            const userAccessService = new UserAccessService();
            const ipaddr = ctx?.req.socket.remoteAddress.split(":")[3] || "86.23.81.228";
           
            const response: AxiosResponse<any> = await axios.get(`https://ipinfo.io/${ipaddr}/json`);
            const locationData = response.data;
            const deviceId = await userAccessService.newAccess({
                ip: ipaddr,
                userId: _id,
                employeeId,
                location: locationData.city,
                platform: input?.platform
            })

            const isPasswordVerified= await bcrypt.compare(password, userDetail[0].password);
            if(isPasswordVerified){
                if(userRolePermission?.length>0){
                    const token = sign({ employeeId, userAccessType, role: userRole, permission: userRolePermission[0]?.permission }, process.env.PRIVATEKEY, {expiresIn: "100 days"});
                    return {
                        response: {token , userAccessType, userRole, permission: userRolePermission[0]?.permission, _id, employeeId, deviceId, employeeDetail },
                        message: "User logged in successfully"
                    }

                }else{
                    const token = sign({ employeeId, userAccessType, role: userRole, permission }, process.env.PRIVATEKEY, {expiresIn: "100 days"});
                    return {
                        response: {token , userAccessType, userRole, permission, _id, employeeId, deviceId, employeeDetail },
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
            // if(input?.isManualPassword!=="0"){
            //     const mail = new MailService();
            //     await mail.sendMail(input?.email, input?.employeeId);
            // }
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
                },
                {
                    $lookup:{
                      from: "employees",
                      localField: "employeeId",
                      foreignField: "_id", // Assuming _id is the field in collectionB that matches the object key in collectionA
                      as: "employeeDetail"
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


    async setPasswordForInvitedUser(input){
        try{
            await UserModal.updateOne({employeeId: input?.employeeId}, {$set: {password: input?.password, isInviteExpired: true}});
            return {
                success: 1,
                response: null,
                message: "Password has been setup successfully !",
            }
        }
        catch(err){
            return {
                success: 0, 
                response: null,
                message: "An error encountered while setting your password"
            }
        }
    }


}

export default UserService;