import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { EmployeeFilter, EmployeeGenericResponse, EmployeeInput, EmployeeUpdateInput } from "../../schema/employeeSchema/employee.schema";
import { EmployeeService } from "../../service/employee/employee.service";

@Resolver()
export class EmployeeResolver{
    constructor(private employeeService: EmployeeService){
        this.employeeService = new EmployeeService();
    }

    @Mutation(()=>EmployeeGenericResponse)
    addEmployee(@Arg('input', {validate: true}) input:EmployeeInput ){
        return this.employeeService.addEmployee(input)
    }

    @Query(()=>EmployeeGenericResponse)
    getEmployee(@Arg('input', {validate: true}) input: EmployeeFilter){
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

}