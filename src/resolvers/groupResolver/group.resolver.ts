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
    deleteGroup(@Arg('id', {validate: true}) id: string){
        return this.groupService.deleteGroup(id);
    }

    @Query(()=>[Group])
    groupList(){
        return this.groupService.groupList();
    }

}