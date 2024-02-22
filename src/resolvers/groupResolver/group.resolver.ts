import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Group, GroupInput, createGroupResponse } from "../../schema/groupSchema/group.schema";
import { GroupService } from "../../service/groupService/group.service";

@Resolver()
export class GroupResolver{

    constructor(private groupService: GroupService){
        this.groupService = new GroupService();
    }

    @Mutation(()=>createGroupResponse)
    createGroup(@Arg('input', {validate: true}) input: GroupInput){
        return this.groupService.createGroup(input);
    }

    @Mutation(()=>createGroupResponse)
    updateGroup(@Arg('input', {validate: true}) input: GroupInput){
        return this.groupService.updateGroup(input);
    }

    @Mutation(()=>createGroupResponse)
    deleteGroup(@Arg('id', {validate: true}) id: string, @Arg('groupIdToMoveIn', {nullable: true}) groupIdToMoveIn: string){
        console.log(id, groupIdToMoveIn)
        return this.groupService.deleteGroup(id, groupIdToMoveIn);
    }

    @Query(()=>[Group])
    groupList(@Arg('objectType', {validate: true}) objectType:String){
        return this.groupService.groupList(objectType);
    }

    

}