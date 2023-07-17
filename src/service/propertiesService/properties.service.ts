import dayjs from "dayjs";
import { PropertiesInput, PropertiesModal } from "../../schema/propertiesSchema/properties.schema";
import { GroupService } from "../groupService/group.service";
import { GroupModal } from "../../schema/groupSchema/group.schema";

export class PropertiesService{
    
    async createProperties(input:PropertiesInput){
        try{
            const groupService = new GroupService();

            await PropertiesModal.create({...input, 
                isDelete: 0,
                isArchive:0, useIn:0 ,createdAt: dayjs()});
            
            await groupService.updateNumberOfProperties(input.groupId);
            return {
                message: "Property added successfully",
                success: 1,
            }
        }
        catch(err:any){
            return{
                message: "An Error encountered while adding property",
                success: 0,
            }
        }
    }

    
    async updateProperties(input:PropertiesInput){
        try{
            const groupService = new GroupService();

            await PropertiesModal.updateOne({_id:input.id},{...input, 
               updatedAt: dayjs()});
            
            await groupService.updateNumberOfProperties(input.groupId);
            return {
                message: "Property updated successfully",
                success: 1,
            }
        }
        catch(err:any){
            return{
                message: "An Error encountered while adding property",
                success: 0,
            }
        }
    }


    async propertyList(){
        const properties = await PropertiesModal
        .aggregate([
            {
                
                $match: {
                    $and: [
                        {isArchive: { $eq: false }},
                        {isDelete: {$eq: false}},
                    ]
                }
            },

            
            {
                $project: {
                  key: "$_id",
                  _id: 1,
                  // Include other fields if needed
                  objectType: 1,
                  groupId: 1,
                  label: 1,
                  fieldType: 1,
                  rules: 1,
                  useIn: 1,
                  description: 1,
                  createdAt: 1,
                  createdBy: 1,
                  updatedAt: 1,
                  updatedBy: 1,
                  groupName: 1,
                  options:1,
                }
            },
            
            // {
            //     $lookup: {
            //         from: "groups",
            //         localField: "_id",
            //         foreignField: "groupId",
            //         as: "group"
            //     }
            // }
        ]);
        console.log(properties);
        return properties;
    }

    async archiveProperty(input){
        try{
            const { id:_id, } = input
            await PropertiesModal.updateOne({ _id },{ isArchive: true, archiveTime:  dayjs() });
            return {
                message: 'Property archived successfully',
                success: 1,
            }
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async unarchiveProperty(input){
        try{
            const { id:_id, } = input
            await PropertiesModal.updateOne({ _id },{ isArchive: false, archiveTime:  dayjs() });
            return {
                message: 'Property archived successfully',
                success: 1,
            }
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    
    async deleteProperty(input){
        try{
            const { id:_id, } = input
            const {groupId} = await this.getPropertyById(_id);
            const groupService = new GroupService();
            await groupService.updateNumberOfPropertiesOnDelete(groupId);
            await PropertiesModal.updateOne({ _id },{ isDelete: true, });
            return {
                message: 'Property archived successfully',
                success: 1,
            }
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }


    async archivePropertyList(){
        try{
            const properties = await PropertiesModal
            .aggregate([
                {
                    
                    $match: {
                        $and: [
                            {isArchive: { $eq: true }},
                            {isDelete: {$eq: false}},
                        ]
                    }
                },
                {
                    $project: {
                        key: "$_id",
                        _id: 1,
                        // Include other fields if needed
                        objectType: 1,
                        groupId: 1,
                        label: 1,
                        fieldType: 1,
                        rules: 1,
                        useIn: 1,
                        description: 1,
                        createdAt: 1,
                        createdBy: 1,
                        updatedAt: 1,
                        updatedBy: 1,
                        groupName: 1,
                        isArchive:1,
                        archiveTime:1,
                    },
                },
                
                
            ]);
            return properties;

        }catch(err:any){
            throw new Error(err.message);
        }
    }

    async archivePropertyFilter(startDate, endDate){
        try{
            const properties = await PropertiesModal
            .aggregate([
                {
                    
                    $match: {
                        $and: [
                            {isArchive: { $eq: true }},
                            {isDelete: {$eq: false}},                            
                            {archiveTime : {
                                $gte: startDate.toString(),
                                $lte: endDate.toString()
                            }}
                        ]
                    }
                },
                {
                    $project: {
                        key: "$_id",
                        _id: 1,
                        // Include other fields if needed
                        objectType: 1,
                        groupId: 1,
                        label: 1,
                        fieldType: 1,
                        rules: 1,
                        useIn: 1,
                        description: 1,
                        createdAt: 1,
                        createdBy: 1,
                        updatedAt: 1,
                        updatedBy: 1,
                        groupName: 1,
                        isArchive:1,
                        archiveTime:1,
                    },
                },
                
                
            ]);
            console.log(properties);
            return properties;

        }catch(err:any){
            throw new Error(err.message);
        }
    }

    async getPropertyById(_id){
        return await PropertiesModal.findById(_id);
    }

    async getPropertyByGroupId(groupId){
        return await PropertiesModal
        .aggregate([
            {
                
                $match: {
                    $and: [
                        {isArchive: { $eq: false }},
                        {isDelete: {$eq: false}},
                        {groupId: {$eq: groupId}},
                    ]
                }
            },

            
            {
                $project: {
                  key: "$_id",
                  _id: 1,
                  // Include other fields if needed
                  objectType: 1,
                  groupId: 1,
                  label: 1,
                  fieldType: 1,
                  rules: 1,
                  useIn: 1,
                  description: 1,
                  createdAt: 1,
                  createdBy: 1,
                  updatedAt: 1,
                  updatedBy: 1,
                  groupName: 1,
                  options:1,
                }
            },
        ]);
    }

    async deletePropertiestesById(groupId){
        try{
            const groupService = new GroupService();
            await groupService.updateNumberOfPropertiesOnDelete(groupId);

            await PropertiesModal.updateMany({groupId},{
                $set: {isDelete: true}
            });
            return true;
        }
        catch(err){
            return false;
        }
        
    }

    
    async getPropertywithFilters(field, value){

        const matchStage = {
            $match: {
              $and: []
            }
          };
        
          if (field && value) {
            matchStage.$match.$and.push({ [field]: value });
            matchStage.$match.$and.push({ isArchive: false });
            matchStage.$match.$and.push({ isDelete: false });
          }else{
            matchStage.$match.$and.push({ isArchive: false });
            matchStage.$match.$and.push({ isDelete: false });
         
          }
        

        return await PropertiesModal
        .aggregate([
            matchStage,            
            {
                $project: {
                  key: "$_id",
                  _id: 1,
                  // Include other fields if needed
                  objectType: 1,
                  groupId: 1,
                  label: 1,
                  fieldType: 1,
                  rules: 1,
                  useIn: 1,
                  description: 1,
                  createdAt: 1,
                  createdBy: 1,
                  updatedAt: 1,
                  updatedBy: 1,
                  groupName: 1,
                  options:1,
                }
            },
        ]);
    }

    async moveGroup({properties, groupId, groupName}){
        const _ids = properties.map((property)=>property.key);
        const groupIds = properties.map((property)=>property.groupId);
        await PropertiesModal.updateMany(
            { _id: { $in: _ids } },
            { $set: { groupId, groupName } }
        );
        const groupService = new GroupService();

        // update the prev group by removing property from them
        for(let i=0;i<properties.length;i++){
            
            const group = await GroupModal.findOne({_id: properties[i].groupId});
            // Subtract 1 from the numberOfProperties field
            const updatedNumberOfProperties = group.properties - 1;
            // Update the document with the new value
            await GroupModal.updateOne(
                { _id: group._id },
                { $set: { properties: updatedNumberOfProperties } }
            );

        }
        

        // update number of properties in which the properties are being moving
        await groupService.bulkUpdateNumberOfProperties(groupId, properties.length);
        return {
            success: 1,
            message : JSON.stringify(groupIds),
        }
    }

    async archiveBulkProperties({ids}){
        try{
            await PropertiesModal.updateMany(
            { _id: { $in: ids } },
            { $set: { isArchive: 1 } });
            
            return {success: 1, message: 'properties archived successfully'};            
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    
    async unarchiveBulkProperties({ids}){
        try{
            await PropertiesModal.updateMany(
            { _id: { $in: ids } },
            { $set: { isArchive: 0 } });
            
            return {success: 1, message: 'properties unArchived successfully'};            
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}