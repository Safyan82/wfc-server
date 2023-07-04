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

    @Query(()=>[Group])
    groupList(){
        return this.groupService.groupList();
    }

}