import dayjs from "dayjs";
import { PropertiesInput, PropertiesModal } from "../../schema/propertiesSchema/properties.schema";
import { GroupService } from "../groupService/group.service";

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
            console.log(properties);
            return properties;

        }catch(err:any){
            throw new Error(err.message);
        }
    }

    async getPropertyById(_id){
        return await PropertiesModal.findById(_id);
    }

}