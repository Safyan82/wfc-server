import { Arg, ID, Query, Resolver } from "type-graphql";
import { EmployeePropertyHistoryInput, EmployeePropertyResponse } from "../../schema/employeePropertyHistorySchema/employeePropertyHistory.schema";
import { EmployeePropertyHistoryService } from "../../service/employeePropertyHistoryService/employeePropertyHistory.service";


@Resolver()
export class EmployeePropertyHistoryResolver{
    constructor(private employeePropertyHistoryService : EmployeePropertyHistoryService){

        this.employeePropertyHistoryService = new EmployeePropertyHistoryService();

    }

    @Query(()=>EmployeePropertyResponse)
    getEmployeePropHistory(@Arg('input', {validate: true}) input: EmployeePropertyHistoryInput){
        return this.employeePropertyHistoryService.getEmployeeHistory(input.propertyId, input?.employeeId);
    }

    @Query(()=>EmployeePropertyResponse)
    getEmployeeAllPropHistory(@Arg('employeeId', {validate: true}) employeeId: String){
        return this.employeePropertyHistoryService.getEmployeeAllPropHistory(employeeId)
    }
}