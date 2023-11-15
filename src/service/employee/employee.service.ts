import dayjs from "dayjs"
import { employeeModal } from "../../schema/employeeSchema/employee.schema"

export class EmployeeService {
    async addEmployee(input){
        try{
            const employee = await employeeModal.create({...input, createdAt: dayjs()});
            return{
                message: "Employee added successfully",
                response: input
            }
        }
        catch(err){
            return {
                message: err.message,
                response: null,
            }
        }
    }

    async getEmployee(){
        try{
            const response = await employeeModal.find();
            return {
                message: "Employee's data reterived successfully",
                response
            }
        }
        catch(err){
            return{
                message: err.message,
                response:null
            }
        }
    }
}