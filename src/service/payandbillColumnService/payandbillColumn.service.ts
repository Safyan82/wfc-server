import dayjs from "dayjs";
import { PayandBillColumnInput, PayandBillColumnModal } from "../../schema/payandbillColumnSchema/payandbillColumnSchema";

export class PayandBillColumnService{

    async newPayandBillColumn(input: PayandBillColumnInput, userId){
        try{
            const isExist = await PayandBillColumnModal.findOne({ $or:[ {columnName: { $regex: input?.columnName, $options: 'i' }}] });
            if(isExist){
                throw new Error("This Pay & Bill Column already exist");
            }
            const isOrderExist = await PayandBillColumnModal.findOne({ $or:[ {columnOrder: input?.columnOrder }] });
            if(isOrderExist){
                throw new Error("Column with this order number is already exist");
            }
            const isOrderCorrect = await PayandBillColumnModal.findOne({ columnOrder: Number(input?.columnOrder)-1 });
            if(!isOrderCorrect?._id){
                console.log(isOrderCorrect);
                throw new Error("Column number should be in sequence");
            }
            const PayandBillColumn = await PayandBillColumnModal.create({...input, createdBy: userId});
            return {
                response: PayandBillColumn,
                message:"pay and bill column record added",
            };

        }catch(err){
            throw new Error(err.message);   
        }
    }

    async getPayandBillColumn(){
        try{

            const payandbillColumn = await PayandBillColumnModal.find();
            return {
                response: payandbillColumn.sort((a,b)=>a.columnOrder-b.columnOrder),
                message: "pay and bill column reterived",
            };
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    
    async updatePayandBillCoulmn(input, userId){
        try{
            const {_id, ...rest} = input;
            const isExist = await PayandBillColumnModal.findOne({columnOrder: input?.columnOrder });
            if(isExist){
                const previous = await PayandBillColumnModal.findOne({_id});
                await PayandBillColumnModal.updateOne({_id: isExist?._id},{$set:{columnOrder: previous?.columnOrder, updatedAt: dayjs().format('DD/MM/YYYY HH:mm'), updatedBy: userId}})
                await PayandBillColumnModal.updateOne({_id},{$set:{...rest, updatedAt: dayjs().format('DD/MM/YYYY HH:mm'), updatedBy: userId}})
            }else{
                await PayandBillColumnModal.updateOne({_id},{$set:{...rest, updatedAt: dayjs().format('DD/MM/YYYY HH:mm'), updatedBy: userId}})

            }
            return {
                message: "Pay and Bill column updated successfully",
                response: {}
            }
        }catch(err){
            throw new Error(err.message);
        }
    }
    
    async deletePayandBillCoulmn(_id){
        try{
            const isExist = await PayandBillColumnModal.findOne({_id});
            if(isExist){
                const getAllColumn = await PayandBillColumnModal.find({columnOrder:{$gt: isExist?.columnOrder}}).sort({columnOrder: 1});
                await Promise.all(getAllColumn.map(async(col, index)=>{
                    const orderNumber = Number(isExist?.columnOrder)+index;
                    return await PayandBillColumnModal.updateOne({_id: col?._id}, {$set:{columnOrder: orderNumber}})
                }));
            }
            const updatedColumn = await PayandBillColumnModal.deleteOne({_id});
            return {
                message: "Pay and Bill column deleted successfully",
                response: updatedColumn
            }
        }catch(err){
            throw new Error(err.message);
        }
    }
}