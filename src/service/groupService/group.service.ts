import { GroupInput, GroupModal } from "../../schema/groupSchema/group.schema";
import dayjs from 'dayjs';
import { PropertiesService } from "../propertiesService/properties.service";

export class GroupService{
    async createGroup(input: GroupInput){
        try{
            const { name } = input;
            const isExist = await GroupModal.findOne({name});
            if(isExist){
                throw new Error("Group already exist");
            }
            await GroupModal.create({...input, properties:0, createdAt: dayjs() })
            return {
                message: "Group added",
                success: 1,
            }
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async updateGroup(input: GroupInput){
        try{
            const {groupId:_id, ...rest} = input;
            console.log({...rest, updatedAt: dayjs()});
            await GroupModal.updateOne({_id},{...rest, updatedAt: dayjs()});
            return {
                message: "Group was updated",
                success: 1,
            }
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async deleteGroup(_id:string){
        try{
            const propertyService = new PropertiesService();
            await propertyService.deletePropertiestesById(_id);
            await GroupModal.updateOne({_id},{isDeleted:1, properties: 0});
            return{
                message: "deleted",
                success: 1,
            }
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async groupList(){
        try{
            const group = await GroupModal.aggregate([
                
                {
                    
                    $match: {
                        $or: [
                            {isDeleted: {$eq: false}},
                            {isDeleted: {$exists: false}},
                        ]
                    }
                },
                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      name: 1,
                      properties:1,

                    }
                }
            ]);
            return group;
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async findGroupById(_id){
        try{
            const {properties} = await GroupModal.findById(_id);
            return properties;
        }
        catch(err:any){
            throw new Error(err);
        }
    }

    async updateNumberOfProperties(_id){
        try{
            const properties = await this.findGroupById(_id);
            const inUse = properties+1;
            await GroupModal.updateOne({_id},{properties: inUse});
            return true;
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async updateNumberOfPropertiesOnDelete(_id, inUse){
        try{
            console.log(inUse, "IN USEEEEEE");
            await GroupModal.findOneAndUpdate({_id},{$set:{properties: inUse}}, {returnOriginal: false});
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async bulkUpdateNumberOfProperties(_id, propertyNum){
        try{
            const properties = await this.findGroupById(_id);
            const total = propertyNum + properties
            await GroupModal.updateOne({_id},{properties: total})
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}