import dayjs from "dayjs";
import { employeeObjectModal } from "../../schema/employeeObjectSchema/employeeObject.Schema";
import { PropertiesService } from "../propertiesService/properties.service";

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
}