import mongoose from "mongoose";
import { SiteAreaModal } from "../../schema/siteAreaSchema/siteArea.schema";

export class SiteAreaService{
    async getSiteAreas(siteId){
        try{
            const siteAreas = await SiteAreaModal.find({siteId, isDeleted: false});
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

    async upsertSiteArea(input){
        try{

            if(input?.id){
                const {id, ...rest} = input;
                const updatedSite = await SiteAreaModal.updateOne({_id: new mongoose.Types.ObjectId(id)}, {$set: rest});
                return updatedSite;
            }else{
                const site = await SiteAreaModal.create(input);
                return site;
            }

        }catch(err){
            throw new Error(err.message);
        }
    }

    async deleteSiteArea(input){
        try{
            const deletedSite = await SiteAreaModal.updateOne({_id: new mongoose.Types.ObjectId(input?.id)}, {$set: {isDeleted: true}})
            return deletedSite;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}