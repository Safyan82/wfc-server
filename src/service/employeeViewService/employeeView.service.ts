import dayjs from "dayjs";
import { EmployeeViewModal } from "../../schema/employeeViewSchema/employeeView.schema";

export class EmployeeViewService{
    async newStandardEmployeeView(){
        const view = await EmployeeViewModal.create({
            name: 'All Employee',
            createdAt: dayjs(),
            isStandard: true,
            visibility: 'public',
            isManual: false,
            advanceFilter: [],
            viewFields: [],
        });

        return view;
    }

    async getEmployeeView(){
        try{
            const employeeView = await EmployeeViewModal.find();
            if(employeeView?.length<1){
                const employeeViewResponse = await this.newStandardEmployeeView();
                
                return{
                    message: "employee View reterived successfully",
                    success: 1,
                    response: employeeViewResponse,
                }
            }else{
                return{
                    message: "employee View reterived successfully",
                    success: 1,
                    response: employeeView,
                }
            }
        }
        catch(err){
            return {
                success: 1, 
                message: "An error encountered while reteriving the employee's view"
            }
        }
    }

    async getSingleEmployeeView(_id){
        try{
            const data = await EmployeeViewModal.findOne({ _id });
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

    async newEmployeeView(input){
        try{
            const isExist = await EmployeeViewModal.findById(input?._id);
            if(isExist &&  input?._id){
                const {createdBy, ...rest} = input;
                const empView = await EmployeeViewModal.updateOne({_id: input?._id}, {...rest, updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')});
                return {
                    response: empView,
                    success: 1,
                    message: "Your custom view is updated successfully",
                }
            }else{  
                const employeeView = await EmployeeViewModal.create({...input, createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')});
                return {
                    success: 1,
                    response: employeeView,
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

    async updateEmployeeView(input){
        try{
            
            const employee = await EmployeeViewModal.updateOne({_id: input?._id}, {...input, updatedDate: dayjs().format('YYYY-MM-DD')});
            return {
                success: 1,
                response: employee,
                message: "Employee View updated successfully",
            }
        }
        catch(err){
            return {
                success: 0,
                message: "An error encountered while updating the employeeView | "+err.message,
            }
        }
    }

}