import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { userRoleInput, userRoleResponse } from "../../schema/userRoleSchema/userRole.schema";
import { UserRoleService } from "../../service/userRoleService/userRole.service";

@Resolver()
export class UserRoleResolver{

    constructor(private userRoleService:  UserRoleService){
        this.userRoleService = new UserRoleService();
    }

    @Mutation(()=>userRoleResponse)
    newUserRole(@Arg('input', {validate: true}) input:userRoleInput){
        return this.userRoleService.newUserRole(input)
    }

    @Mutation(()=>userRoleResponse)
    updateUserRole(@Arg('input', {validate: true}) input:userRoleInput){
        return this.userRoleService.updateUserRole(input)
    }

    @Query(()=>userRoleResponse)
    userRoleList(){
        return this.userRoleService.userRoleList();
    }

    @Query(()=>userRoleResponse)
    userRoleById(@Arg('id') id:String){
        return this.userRoleService.userRoleById(id);
    }
}