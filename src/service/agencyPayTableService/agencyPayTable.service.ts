import dayjs from "dayjs";
import { AgencyPayTableModal } from "../../schema/agencyPayTableSchema/agencyPayTable.schema";

export class AgencyPayTableService{
    async upsertAgencyPayTable(input){
        try{

            const {agencyId, payLevelId, payTableMeta} = input;

            const isExist = await AgencyPayTableModal.findOne({payLevelId, agencyId});
            if(isExist){
                await AgencyPayTableModal.updateOne( {payLevelId, agencyId}, {$set: {payTableMeta}} );

            }else{
                await AgencyPayTableModal.create({...input, createdAt: dayjs().format("DD/MM/YYYY HH:mm")});
            }

            return{
                response: {},
                message: "Agency Pay Table Upsert Successfull",
            }

        }catch(err){
            throw new Error(err)
        }

    }

    async getAgencyPayTable(agencyId){
        try{
            const payTable = await AgencyPayTableModal.find({agencyId});
            return {
                response: payTable,
                message: "Agency Pay Table Reterived Successfully"
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}