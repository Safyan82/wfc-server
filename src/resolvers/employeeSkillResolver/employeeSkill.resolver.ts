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
        return this.employeeSkillService.newEmployeeSkill(input, ctx?.user?.employeeId)
    }

    @Authorized()
    @Query(()=>EmployeeSkillResponse)
    getEmployeeSkill(@Arg('employeeId') employeeId: String, @Arg('condition') condition: String){
        return this.employeeSkillService.getEmployeeSkill(employeeId, condition)
    }

    @Authorized()
    @Mutation(()=>EmployeeSkillResponse)
    deleteEmployeeSkill(@Arg('input') input:EmployeeDeleteInput, @Ctx() ctx:Context){
        return this.employeeSkillService.deleteEmployeeSkill(input?.id, ctx?.user?.employeeId);
    }

    @Authorized()
    @Mutation(()=>EmployeeSkillResponse)
    updateEmployeeSkill(@Arg('input') input:EmployeeSkillInput, @Ctx() ctx:Context){
        return this.employeeSkillService.updateEmployeeSkill(input, ctx?.user?.employeeId);
    }
}