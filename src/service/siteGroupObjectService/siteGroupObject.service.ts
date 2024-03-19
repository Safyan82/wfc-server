import dayjs from "dayjs";
import { PropertiesService } from "../propertiesService/properties.service";
import { objectTypeList } from "../../utils/objectype";
import { extractPermittedPropIds } from "../../utils/permissionPower/extractPermittedProps";
import mongoose from "mongoose";
import { siteGroupObjectModal } from "../../schema/siteGroupObjectSchema/siteGroupObject.schema";

export class SiteGroupObjectService{
    
    async updateMandatoryObject(propertyId, isReadOnly){
        try{
            
            const isExist  = await siteGroupObjectModal.findOne({propertyId: propertyId});
            if(isExist){
                await siteGroupObjectModal.updateOne({propertyId},{isReadOnly})
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
            const isExist  = await siteGroupObjectModal.findOne({propertyId: propertyId});
            if(isExist){
                await siteGroupObjectModal.updateOne({propertyId},{isReadOnly})
            }else{

                // do it to update use in prop
                const property = new PropertiesService();
                const propertyDetail = await property.getPropertyById(propertyId);
                const useIn = Number(propertyDetail?.useIn) + 1;
            
                await property?.updatePropertyInUse(propertyId, useIn);
            
                await siteGroupObjectModal.create({
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

    async updateSiteGroupObjectOrder({fields}){
        try{
            await Promise.all(fields?.map(async(field, index)=>{
                return await siteGroupObjectModal.updateOne({propertyId: field?.propertyId},{$set:{order: index}})
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

    async createSiteGroupObject({fields}){
        try{
            await Promise.all(fields?.map(async(schema)=>{
                const isExist  = await siteGroupObjectModal.findOne({propertyId: schema?.propertyId});
                if(isExist && Object.keys(isExist)?.length>0){

                    return await siteGroupObjectModal.updateOne({propertyId: schema?.propertyId},{
                        $set:{isMandatory: schema?.isMandatory},
                    });

                }else{
                    // do it to update use in prop
                    
                    const property = new PropertiesService();
                    const propertyDetail = await property.getPropertyById(schema?.propertyId);
                    const useIn = Number(propertyDetail?.useIn) + 1;
                
                    await property?.updatePropertyInUse(schema?.propertyId, useIn);
                    return await siteGroupObjectModal.create({
                        ...schema,
                        isReadOnly: 0,
                        date: dayjs(),
                    });
                }
            }));

            return {
                response:{
                    success: 1,
                    message: "Data Fields added successfully",
                }
            };

        }catch(err){
            throw new Error(err.message);
        }
    }

    async siteGroupObject(ctx){
        try{

            
            // get all owned Props by particular requesting user
            
            const propService = new PropertiesService();

            const ownedProp = await propService.getOwnedProp(ctx?.user?._id, objectTypeList.SiteGroup, ctx?.user?.userAccessType);
            // terminate all owned props
            
            
            const Permittedproperties = ctx?.user?.userAccessType!== "ADMIN PERMISSION" ? extractPermittedPropIds(ctx, objectTypeList.SiteGroup) || [] : [];
            // get all the created properties that are not in list of permitted properties
            // case 1;  in created properties there can be permitted props
            // case 2;  props can be created after the user created for the particulat object type
            const getNewlyCreatedProps = ownedProp?.filter((ownedProp)=>{
                if(Permittedproperties?.length>0){
                    return Permittedproperties.find((permittedProp)=>new mongoose.Types.ObjectId(permittedProp) !== new mongoose.Types.ObjectId(ownedProp))
                }else{
                    return ownedProp;
                }
            });
            
            const extendedPermittedProperties = [...Permittedproperties, ...getNewlyCreatedProps];
            
            console.log(ownedProp, "ownedprop", Permittedproperties, ctx?.user?._id, extendedPermittedProperties)


            const siteGroupObjectData = await siteGroupObjectModal.aggregate([
                {
                    $match:{
                        propertyId:{ $in: extendedPermittedProperties}
                    }
                },
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
                    "propertyDetail.groupId": 1,
                    "propertyDetail.groupName": 1,
                  }
                }
            ]);
            const siteGroupObject = (siteGroupObjectData?.filter((siteGroup)=>
                siteGroup?.propertyDetail?.isArchive!=true))
            
            return {
                response: siteGroupObject
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async deleteSiteGroupObject({properties}){
        try{

            await siteGroupObjectModal.deleteMany({propertyId: { $in: properties}});
            
                    
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

    async getSinglePropFromSiteGroupObjectSchema(id){
        try{
            const {isMandatory} = await siteGroupObjectModal.findById(id);
            return isMandatory;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
};