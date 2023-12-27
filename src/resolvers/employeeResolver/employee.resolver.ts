import { Arg, Mutation, Resolver, Query, Authorized, Ctx } from "type-graphql";
import { BulkEmployeeUpdateInput, EmployeeFilter, EmployeeGenericResponse, EmployeeInput, EmployeeUpdateInput } from "../../schema/employeeSchema/employee.schema";
import { EmployeeService } from "../../service/employee/employee.service";
import { Context } from "../../utils/context";

@Resolver()
export class EmployeeResolver{
    constructor(private employeeService: EmployeeService){
        this.employeeService = new EmployeeService();
    }

    @Mutation(()=>EmployeeGenericResponse)
    addEmployee(@Arg('input', {validate: true}) input:EmployeeInput ){
        return this.employeeService.addEmployee(input)
    }

    @Authorized(['standardPermissions', 'customPermissions', 'adminPermission'])
    @Query(()=>EmployeeGenericResponse)
    getEmployee(@Ctx() ctx: Context, @Arg('input', {validate: true}) input: EmployeeFilter){

        return this.employeeService.getEmployee(input);
    }

    @Query(()=>EmployeeGenericResponse)
    singleEmployee(@Arg('_id', {validate: true}) _id:String){
        return this.employeeService.singleEmployee(_id);
    }

    @Mutation(()=>EmployeeGenericResponse)
    updateEmployee(@Arg('input', {validate: true}) input:EmployeeUpdateInput ){
        return this.employeeService.updateEmployee(input);
    }

    @Mutation(()=>EmployeeGenericResponse)
    updateBulkEmployee(@Arg('input', {validate:true}) input:BulkEmployeeUpdateInput){
        return this.employeeService.updateBulkEmployee(input);
    }

    @Query(()=>EmployeeGenericResponse)
    checkUserByEmail(@Arg('email', {validate: true}) email:string){
        return this.employeeService.checkUserByEmail(email);
    }
}