import dayjs from "dayjs";
import { SiteGroupPayTableModal } from "../../schema/siteGroupPayTable/siteGroupPayTable.schema";

export class SiteGroupPayTableService{
    async upsertSiteGroupPayTable(input){
        try{

            const {agencyId, payLevelId, payTableMeta} = input;

            const isExist = await SiteGroupPayTableModal.findOne({payLevelId, agencyId});
            if(isExist){
                await SiteGroupPayTableModal.updateOne( {payLevelId, agencyId}, {$set: {payTableMeta}} );

            }else{
                await SiteGroupPayTableModal.create({...input, createdAt: dayjs().format("DD/MM/YYYY HH:mm")});
            }

            return{
                response: {},
                message: "SiteGroup Pay Table Upsert Successfull",
            }

        }catch(err){
            throw new Error(err)
        }

    }

    async getSiteGroupPayTable(agencyId){
        try{
            const payTable = await SiteGroupPayTableModal.find({agencyId});
            return {
                response: payTable,
                message: "Site Group Pay Table Reterived Successfully"
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}