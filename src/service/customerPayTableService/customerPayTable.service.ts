import dayjs from "dayjs";
import { CustomerPayTableModal } from "../../schema/customerPayTableSchema/customerPayTable.schema";

export class CustomerPayTableService{
    async upsertCustomerPayTable(input){
        try{

            const {payLevelId, payTableMeta} = input;

            const isExist = await CustomerPayTableModal.findOne({payLevelId});
            if(isExist){
                await CustomerPayTableModal.updateOne( {payLevelId}, {$set: {payTableMeta}} );

            }else{
                await CustomerPayTableModal.create({...input, createdAt: dayjs().format("DD/MM/YYYY HH:mm")});
            }

            return{
                response: {},
                message: "Customer Pay Table Upsert Successfull",
            }

        }catch(err){
            throw new Error(err)
        }

    }

    async getCustomerPayTable(){
        try{
            const payTable = await CustomerPayTableModal.find();
            return {
                response: payTable,
                message: "Customer Pay Table Reterived Successfully"
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}