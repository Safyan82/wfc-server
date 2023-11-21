import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { EmployeeFilter, EmployeeGenericResponse, EmployeeInput } from "../../schema/employeeSchema/employee.schema";
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

}