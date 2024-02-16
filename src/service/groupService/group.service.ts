import { GroupInput, GroupModal } from "../../schema/groupSchema/group.schema";
import dayjs from 'dayjs';
import { PropertiesService } from "../propertiesService/properties.service";
import { TabsService } from "../tabsService/tabs.service";

export class GroupService{
    async createGroup(input: GroupInput){
        try{
            const { name } = input;
            const isExist = await GroupModal.findOne({name, isDeleted: false});
            if(isExist){
                throw new Error("Group already exist");
            }
            const grp = await GroupModal.create({...input, properties:0, createdAt: dayjs() });

            // const tabServices = new TabsService();
            // await tabServices.updateTab(grp?._id, grp?.tabs);

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
            const propertyService = new PropertiesService();
            await propertyService.updatePropertiesByGroupId(_id, rest.name)
            await GroupModal.updateOne({_id},{...rest, updatedAt: dayjs()});
            
            // const tabServices = new TabsService();
            // await tabServices.updateTab(_id, rest?.tabs);

            return {
                message: "Group was updated",
                success: 1,
            }
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async findGroupNameById(_id){
        
        try{
            const {name} = await GroupModal.findById(_id);
            return name;
        }
        catch(err:any){
            throw new Error(err);
        }
    }
    async deleteGroup(_id:string, groupIdToMoveIn:string){
        try{
            const propertyService = new PropertiesService();
            const properties = await propertyService.getPropertyByGroupId(_id);
            const newGroupName = await this.findGroupNameById(groupIdToMoveIn);
            await propertyService.updatePropertiesGroup(groupIdToMoveIn, _id, newGroupName);
            const alreadyInUse = await this.findGroupById(groupIdToMoveIn);
            await GroupModal.updateOne({_id: groupIdToMoveIn},{properties: (Number(properties.length)+Number(alreadyInUse)) })
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

    async groupList(objectType){
        try{
            const group = await GroupModal.aggregate([
                
                {
                    
                    $match: {
                        $and: [
                            {objectType: objectType},

                            {
                                $or: [
                                    {isDeleted: {$eq: false}},
                                    {isDeleted: {$exists: false}},
                                ]
                            }
                        ]
                    }
                },
                {
                    $lookup:{
                        from: "properties",
                        localField: "_id",
                        foreignField: "groupId",
                        as: "propertyList"
                    }
                },

                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      name: 1,
                      properties:1,
                      tabs:1,
                      propertyList: 1,
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
    
    async updateNumberOfArchivePropertiesOnDelete(_id){
        try{
            const properties = await this.findGroupById(_id);
            const inUse = properties-1;
            await GroupModal.updateOne({_id}, {$set: {properties: inUse}});
            return true;
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async updateNumberOfPropertiesOnDelete(_id, inUse){
        try{
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

    async moveandDeleteProperty(){

    }
}