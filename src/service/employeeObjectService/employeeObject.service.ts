import dayjs from "dayjs";
import { employeeObjectModal } from "../../schema/employeeObjectSchema/employeeObject.Schema";
import { PropertiesService } from "../propertiesService/properties.service";
import { objectTypeList } from "../../utils/objectype";
import { extractPermittedPropIds } from "../../utils/permissionPower/extractPermittedProps";
import { UserAccessService } from "../userAccessService/userAccess.service";
import { getLocation } from '../../utils/getUserLocation'


export class EmployeeObjectService{
    async generateMandatoryObject(propertyId, isReadOnly){
        try{
            const isExist  = await employeeObjectModal.findOne({propertyId: propertyId});
            if(isExist){
                await employeeObjectModal.updateOne({propertyId},{isReadOnly})
            }else{

                // do it to update use in prop
                const property = new PropertiesService();
                const propertyDetail = await property.getPropertyById(propertyId);
                const useIn = Number(propertyDetail?.useIn) + 1;
            
                await property?.updatePropertyInUse(propertyId, useIn);
            
                await employeeObjectModal.create({
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
            
            const isExist  = await employeeObjectModal.findOne({propertyId: propertyId});
            if(isExist){
                await employeeObjectModal.updateOne({propertyId},{isReadOnly})
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

    async deleteEmployeeObject({properties}){
        try{

            await employeeObjectModal.deleteMany({propertyId: { $in: properties}});
            
                    
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

    
    async updateEmployeeObjectOrder({fields}){
        try{
            await Promise.all(fields?.map(async(field, index)=>{
                return await employeeObjectModal.updateOne({propertyId: field?.propertyId},{$set:{order: index}})
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

    async createEmployeeObject({fields}){
        try{
            await Promise.all(fields?.map(async(schema)=>{
                const isExist  = await employeeObjectModal.findOne({propertyId: schema?.propertyId});
                if(isExist && Object.keys(isExist)?.length>0){

                    return await employeeObjectModal.updateOne({propertyId: schema?.propertyId},{
                        $set:{isMandatory: schema?.isMandatory},
                    });

                }else{
                    // do it to update use in prop
                    
                    const property = new PropertiesService();
                    const propertyDetail = await property.getPropertyById(schema?.propertyId);
                    const useIn = Number(propertyDetail?.useIn) + 1;
                
                    await property?.updatePropertyInUse(schema?.propertyId, useIn);
                    return await employeeObjectModal.create({
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

    async employeeObject(ctx){
        try{
            // log user access
            const userAccessService = new UserAccessService();
            await userAccessService.newAccess({
                ip: ctx?.req.socket.remoteAddress,
                userId: "23",
                employeeId: '33',
                location: await getLocation(ctx?.req.socket.remoteAddress)
            })

            const Permittedproperties = extractPermittedPropIds(ctx, objectTypeList.Employee);

            const employeeObjectData = await employeeObjectModal.aggregate([
                {
                    $match:{
                        propertyId: {$in: Permittedproperties}
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
            const employeeObject = (employeeObjectData?.filter((employee)=>
                employee?.propertyDetail?.isArchive!=true))
            
            return {
                response: employeeObject
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}