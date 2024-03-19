import dayjs from "dayjs";
import { PropertiesService } from "../propertiesService/properties.service";
import { objectTypeList } from "../../utils/objectype";
import { extractPermittedPropIds } from "../../utils/permissionPower/extractPermittedProps";
import mongoose from "mongoose";
import { customerObjectModal } from "../../schema/customerObjectSchema/customerobject.schema";


export class CustomerObjectService{
    async generateMandatoryObject(propertyId, isReadOnly){
        try{
            const isExist  = await customerObjectModal.findOne({propertyId: propertyId});
            if(isExist){
                await customerObjectModal.updateOne({propertyId},{isReadOnly})
            }else{

                // do it to update use in prop
                const property = new PropertiesService();
                const propertyDetail = await property.getPropertyById(propertyId);
                const useIn = Number(propertyDetail?.useIn) + 1;
            
                await property?.updatePropertyInUse(propertyId, useIn);
            
                await customerObjectModal.create({
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
     
    async updateMandatoryObject(propertyId, isReadOnly){
        try{
            
            const isExist  = await customerObjectModal.findOne({propertyId: propertyId});
            if(isExist){
                await customerObjectModal.updateOne({propertyId},{isReadOnly})
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

    async deleteCustomerObject({properties}){
        try{

            await customerObjectModal.deleteMany({propertyId: { $in: properties}});
            
                    
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

    
    async updateCustomerObjectOrder({fields}){
        try{
            await Promise.all(fields?.map(async(field, index)=>{
                return await customerObjectModal.updateOne({propertyId: field?.propertyId},{$set:{order: index}})
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

    async createCustomerObject({fields}){
        try{
            await Promise.all(fields?.map(async(schema)=>{
                const isExist  = await customerObjectModal.findOne({propertyId: schema?.propertyId});
                if(isExist && Object.keys(isExist)?.length>0){

                    return await customerObjectModal.updateOne({propertyId: schema?.propertyId},{
                        $set:{isMandatory: schema?.isMandatory},
                    });

                }else{
                    // do it to update use in prop
                    
                    const property = new PropertiesService();
                    const propertyDetail = await property.getPropertyById(schema?.propertyId);
                    const useIn = Number(propertyDetail?.useIn) + 1;
                
                    await property?.updatePropertyInUse(schema?.propertyId, useIn);
                    return await customerObjectModal.create({
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

    async customerObject(ctx){
        try{

            // get all owned Props by particular requesting user
            
            const propService = new PropertiesService();

            const ownedProp = await propService.getOwnedProp(ctx?.user?._id, objectTypeList.customer, ctx?.user?.userAccessType);

            // terminate all owned props


            const Permittedproperties =  ctx?.user?.userAccessType!== "ADMIN PERMISSION" ? extractPermittedPropIds(ctx, objectTypeList.customer) || [] : [];
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
            
            let matchStage = {
                $match: {
                    $and: [
                        {
                            propertyId: {
                                $ne: null
                            }
                        }
                    ]
                }
            };

            if(Permittedproperties?.length>0){
                matchStage.$match.$and.push({
                    propertyId: {$in: extendedPermittedProperties}
                })
            }
            
            const customerObjectData = await customerObjectModal.aggregate([
                matchStage,
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
            const customerObject = (customerObjectData?.filter((customer)=>
                customer?.propertyDetail?.isArchive!=true))
            
            return {
                response: customerObject
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}