import { GroupInput, GroupModal } from "../../schema/groupSchema/group.schema";
import dayjs from 'dayjs';

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
            return await GroupModal.updateOne({_id},{...rest, updatedAt: dayjs()});

        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async deleteGroup(_id:string){
        try{
            await GroupModal.updateOne({_id},{isDeleted:1});
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
}