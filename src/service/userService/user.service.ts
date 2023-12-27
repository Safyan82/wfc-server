import bcrypt from "bcrypt";
import { userInput, UserModal } from "../../schema/userSchema/user.schema";
import { sign } from "jsonwebtoken";
import dayjs from "dayjs";
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
    async verifyPassword(input){
        try{
            const {employeeId, password} = input;
            const userDetail = await UserModal.findOne({employeeId});
            const {userAccessType, userRole, permission} = userDetail;
            const isPasswordVerified= await bcrypt.compare(password, userDetail.password);
            if(isPasswordVerified){
                const token = sign({ employeeId, userAccessType, role: userRole, permission }, process.env.PRIVATEKEY, { expiresIn: '1h' });
                return {
                    response: {token},
                    message: "User logged in successfully"
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
}

export default UserService;