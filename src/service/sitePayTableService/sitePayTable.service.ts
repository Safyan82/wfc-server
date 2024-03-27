import dayjs from "dayjs";
import { SitePayTableModal } from "../../schema/sitePayTableSchema/sitePayTable.schema";

export class SitePayTableService{
    async upsertSitePayTable(input){
        try{

            const {payLevelId, payTableMeta, customerId} = input;

            const isExist = await SitePayTableModal.findOne({payLevelId});
            if(isExist){
                await SitePayTableModal.updateOne( {payLevelId, customerId}, {$set: {payTableMeta}} );

            }else{
                await SitePayTableModal.create({...input, createdAt: dayjs().format("DD/MM/YYYY HH:mm")});
            }

            return{
                response: {},
                message: "Site Pay Table Upsert Successfull",
            }

        }catch(err){
            throw new Error(err)
        }

    }

    async getSitePayTable(siteId){
        try{
            const payTable = await SitePayTableModal.find({siteId});
            return {
                response: payTable,
                message: "Site Pay Table Reterived Successfully"
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}