import mongoose from "mongoose";
import { SiteAreaModal } from "../../schema/siteAreaSchema/siteArea.schema";

export class SiteAreaService{
    async getSiteAreas(){
        try{
            const siteAreas = await SiteAreaModal.find();
            return siteAreas;
        }catch(err){
            throw new Error(err.message);
        }
    }

    async getSiteArea(_id){
        
        try{
            const siteAreas = await SiteAreaModal.findById(_id);
            return siteAreas;
        }catch(err){
            throw new Error(err.message);
        }

    }

    async upsertSiteArea(_id, input){
        try{

            if(_id){
                const updatedSite = await SiteAreaModal.updateOne({_id: new mongoose.Types.ObjectId(_id)}, {$set: input});
                return updatedSite;
            }else{
                const site = await SiteAreaModal.create(input);
                return site;
            }

        }catch(err){
            throw new Error(err.message);
        }
    }
}