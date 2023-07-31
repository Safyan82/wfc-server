import dayjs from "dayjs";
import { branchObjectModal } from "../../schema/branchObjectSchema/branchObject.schema";
import { PropertiesService } from "../propertiesService/properties.service";

export class BranchObjectService{
    async updateMandatoryObject(propertyId, isReadOnly){
        try{
            
            const isExist  = await branchObjectModal.findOne({propertyId: propertyId});
            if(isExist){
                await branchObjectModal.updateOne({propertyId},{isReadOnly})
            }
            else{
                if(isReadOnly==true){
                    this.generateMandatoryObject(propertyId, true);
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async generateMandatoryObject(propertyId, isReadOnly){
        try{
            const isExist  = await branchObjectModal.findOne({propertyId: propertyId});
            if(isExist){
                await branchObjectModal.updateOne({propertyId},{isReadOnly})
            }else{

                // do it to update use in prop
                const property = new PropertiesService();
                const propertyDetail = await property.getPropertyById(propertyId);
                const useIn = Number(propertyDetail?.useIn) + 1;
            
                await property?.updatePropertyInUse(propertyId, useIn);
            
                await branchObjectModal.create({
                    propertyId,
                    isMandatory: 1,
                    isReadOnly: isReadOnly? isReadOnly: false,
                    date: dayjs(),
                });
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    async updateBranchObjectOrder({fields}){
        try{
            await Promise.all(fields?.map(async(field, index)=>{
                return await branchObjectModal.updateOne({propertyId: field?.propertyId},{$set:{order: index}})
            }));
            return{
                response:{
                    success: 1,
                    message: "row updated"
                }
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    async createBranchObject({fields}){
        try{
            await Promise.all(fields?.map(async(schema)=>{
                const isExist  = await branchObjectModal.findOne({propertyId: schema?.propertyId});
                if(isExist && Object.keys(isExist)?.length>0){

                    return await branchObjectModal.updateOne({propertyId: schema?.propertyId},{
                        $set:{isMandatory: schema?.isMandatory},
                    });

                }else{
                    // do it to update use in prop
                    
                    const property = new PropertiesService();
                    const propertyDetail = await property.getPropertyById(schema?.propertyId);
                    const useIn = Number(propertyDetail?.useIn) + 1;
                
                    await property?.updatePropertyInUse(schema?.propertyId, useIn);
                    return await branchObjectModal.create({
                        ...schema,
                        isReadOnly: 0,
                        date: dayjs(),
                    });
                }
            }));

            return {
                response:{
                    success: 1,
                    message: "Properties added successfully",
                }
            };

        }catch(err){
            throw new Error(err.message);
        }
    }

    async branchObject(){
        try{
            const branchObjectData = await branchObjectModal.aggregate([
                {
                  $lookup: {
                    from: "properties",
                    localField: "propertyId",
                    foreignField: "_id",
                    as: "propertyDetail"
                  }
                },
                {
                  $unwind: "$propertyDetail"
                },
                {
                  $project: {
                    _id: 1,
                    propertyId: 1,
                    isReadOnly: 1,
                    isMandatory: 1,
                    order: 1,
                    "propertyDetail.label": 1,
                    "propertyDetail.rules": 1,
                    "propertyDetail.fieldType": 1,
                    "propertyDetail.options": 1,
                    "propertyDetail.isArchive": 1,
                  }
                }
            ]);
            const branchObject = (branchObjectData?.filter((branch)=>
                branch?.propertyDetail?.isArchive!=true))
            
            return {
                response: branchObject
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async deleteBranchObject({properties}){
        try{

            await branchObjectModal.deleteMany({propertyId: { $in: properties}});
            
                    
            const property = new PropertiesService();
            Promise.all(properties?.map(async (prop)=>{
                const propertyDetail = await property.getPropertyById(prop);
                const useIn = Number(propertyDetail?.useIn) - 1;
                
                return await property?.updatePropertyInUse(prop, useIn);
            }));

            return {
                 response: properties
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
};