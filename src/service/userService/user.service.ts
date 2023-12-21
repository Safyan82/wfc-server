import { userInput, UserModal } from "../../schema/userSchema/user.schema";
// import { consumer, producer } from "../utils/kafka";

class UserService{
    async newUser(input: userInput){
        try{
            const user = await UserModal.create(input);
              
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
}

export default UserService;