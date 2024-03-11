import dayjs from "dayjs";
import { PayTableModal } from "../../schema/payTableSchema/payTable.schema";

export class PayTableService{
    async upsertPayTable(input){
        try{

            const {payLevelId, payTableMeta} = input;

            const isExist = await PayTableModal.findOne({payLevelId});
            if(isExist){
                await PayTableModal.updateOne( {payLevelId}, {$set: {payTableMeta}} );

            }else{
                await PayTableModal.create({...input, createdAt: dayjs().format("DD/MM/YYYY HH:mm")});
            }

            return{
                response: {},
                message: "Pay Table Upsert Successfull",
            }

        }catch(err){
            throw new Error(err)
        }

    }

    async getPayTable(){
        try{
            const payTable = await PayTableModal.find();
            return {
                response: payTable,
                message: "Pay Table Reterived Successfully"
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}