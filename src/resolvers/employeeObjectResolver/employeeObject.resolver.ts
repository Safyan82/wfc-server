import { Arg, Query, Resolver } from "type-graphql";
import { EmployeeObjectService } from "../../service/employeeObjectService/employeeObject.service";
import { GenericEmployeeObjectResponse, employeeObjectInput } from "../../schema/employeeObjectSchema/employeeObject.Schema";

@Resolver()
export class EmployeeObjectResolver{
    constructor(private employeeObjectService: EmployeeObjectService){
        this.employeeObjectService = new EmployeeObjectService();
    }

    @Query(()=>GenericEmployeeObjectResponse)
    getEmployeeObject(){
        return this.employeeObjectService.employeeObject()
    }
}