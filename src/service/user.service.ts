import { CreateUserInput, UserModal } from "../schema/user.schema";
// import { consumer, producer } from "../utils/kafka";

class UserService{
    async createUser(input: CreateUserInput){
        try{
            const user = await UserModal.create(input);
            const messages = JSON.stringify(input);
            // await producer.send([{topic: 'wfc-test', messages}], (error, _) => {
            //     if (error) {
            //       throw new Error(error);
            //     }
            //     producer.close();
            //   });
              
            return user;
        }
        catch(err:any){
            throw new Error(err);
        }
    }
}

export default UserService;