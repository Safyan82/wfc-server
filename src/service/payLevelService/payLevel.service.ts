import dayjs from "dayjs";
import { PayLevelModal } from "../../schema/payLevelSchema/payLevel.schema";

export class PayLevelService{

    async newPayLevel(input, userId){
        try{
            const isExist  = await PayLevelModal.findOne({ $or:[ {name: { $regex: input?.name, $options: 'i' }}, {code: { $regex: input?.code, $options: 'i' } }] })
            if(isExist){
                throw new Error("Pay Level already exist with this name or code");
            }else{
                const payLevel = await PayLevelModal.create({...input, createdAt: dayjs().format("DD/MM/YYYY HH:mm"), createdBy: userId})
                return ({
                    response: payLevel,
                    message: "Pay Level added successfully",
                })
            }
        }catch(err){
            throw new Error(err.message);
        }
    }


    async getPayLevel(){
        try{
            const payLevel = await PayLevelModal.find();
            return({
                response: payLevel,
                message: "Pay Level reterived",
            });
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    

    async updatePayLevel(input, userId){
        try{
            const {_id, ...rest} = input
            const payLevel = await PayLevelModal.updateOne({_id}, {$set:{...rest, updatedAt: dayjs().format("DD/MM/YYYY HH:mm"), updatedBy: userId}});
            return ({
                response: payLevel,
                message: "Pay Level was updated successfully",
            })
            
        }catch(err){
            throw new Error(err.message);
        }
    }

    
    async deletePayLevel(_id){
        try{
            const payLevel = await PayLevelModal.deleteOne({_id});
            return({
                response: payLevel,
                message: "Pay level deleted successfully",
            });
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    

}