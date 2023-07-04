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
            await GroupModal.create({...input, createdAt: dayjs() })
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
            const {groupId:_id} = input;
            return await GroupModal.updateOne({_id},{...input, updatedAt: dayjs()});

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

                    }
                }
            ]);
            console.log(group);
            return group;
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }
}