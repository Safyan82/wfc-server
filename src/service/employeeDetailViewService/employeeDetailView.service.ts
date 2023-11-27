
import dayjs from "dayjs";
import { EmployeeDetailViewInput, EmployeeDetailViewModal } from "../../schema/employeeDetailViewSchema/employeeDetailView.schema";

export class EmployeeDetailViewService{

    async addEmployeeDetailView(input: EmployeeDetailViewInput){
        try{
            const isExist = await EmployeeDetailViewModal.findById(input?._id);
            if(isExist &&  input?._id){
                const {createdBy, ...rest} = input;
                await EmployeeDetailViewModal.updateOne({_id: input?._id}, {...rest, updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')});
                return {
                    success: 1,
                    message: "Your custom view is updated successfully",
                }
            }else{  
                await EmployeeDetailViewModal.create({...input, createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')});
                return {
                    success: 1,
                    message: "Your custom view is added successfully",
                }
            }
            
        }
        catch(err){
            return{
                success: 0,
                message: err.message,
                response: null
            }
        }
       
    }

    async getEmployeeViewForUser(createdBy, createdFor){
        try{
            const data = await EmployeeDetailViewModal.findOne({ $and: [{createdBy}, {createdFor}]});
            return {
                success: 1,
                message: 'Branch view data fields for this user only',
                response: data,
            }
        }
        catch(err){
            return{
                success: 0,
                message: err.message || "an error encountered while reteriving branch view for this user"

            }
        }
    }
}