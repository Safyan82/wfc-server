import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { EmployeeSkillService } from "../../service/employeeSkillService/employeeSkill.service";
import { EmployeeDeleteInput, EmployeeSkillInput, EmployeeSkillResponse } from "../../schema/employeeSkill/employeeSkill.schema";
import { Context } from "../../utils/context";

@Resolver()
export class EmployeeSkillResolver{
    constructor(private employeeSkillService: EmployeeSkillService){
        this.employeeSkillService = new EmployeeSkillService();
    }

    @Authorized()
    @Mutation(()=>EmployeeSkillResponse)
    newEmployeeSkill(@Ctx() ctx:Context, @Arg('input') input:EmployeeSkillInput){
        return this.employeeSkillService.newEmployeeSkill(input, ctx?.user?._id)
    }

    @Authorized()
    @Query(()=>EmployeeSkillResponse)
    getEmployeeSkill(@Arg('employeeId') employeeId: String){
        return this.employeeSkillService.getEmployeeSkill(employeeId)
    }

    @Authorized()
    @Mutation(()=>EmployeeSkillResponse)
    deleteEmployeeSkill(@Arg('input') input:EmployeeDeleteInput){
        return this.employeeSkillService.deleteEmployeeSkill(input?.id);
    }

    @Authorized()
    @Mutation(()=>EmployeeSkillResponse)
    updateEmployeeSkill(@Arg('input') input:EmployeeSkillInput){
        return this.employeeSkillService.updateEmployeeSkill(input);
    }
}