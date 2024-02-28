import dayjs from "dayjs";
import { employeeSkillModal } from "../../schema/employeeSkill/employeeSkill.schema";
import mongoose from "mongoose";

export class EmployeeSkillService{

    async newEmployeeSkill(input, userId){
        try{
            const isExist = await employeeSkillModal.findOne({skill: input?.skill});
            if(isExist){
                throw new Error("This skill already exist");
            }else{
                const employeeSkill = await employeeSkillModal.create({...input, createdBy: userId, createdAt: dayjs().format("DD/MM/YYYY HH:mm")})
                return {
                    message: "Employee skill added successfully",
                    response: employeeSkill,
                }
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    async updateEmployeeSkill(input){
        const {_id, ...rest} = input;
        try{
            const empSkill = await employeeSkillModal.updateOne({_id},{$set:rest});
            return{
                response: empSkill,
                message: "Employee Skill Updated Successfully",
            }
        }catch(err){
            throw new Error("An error has been occured"+err.message);
        }
    }

    async getEmployeeSkill(employeeId){
        try{
            const empSkill = await employeeSkillModal.aggregate([
                {
                    $match: {
                        employeeId: new mongoose.Types.ObjectId(employeeId)
                    }
                },
                {
                    $lookup:{
                        foreignField:'_id',
                        localField:'categoryId',
                        from:'skillcategories',
                        as:'categoryDetail'
                    }
                },
                {
                    $lookup:{
                        foreignField:'_id',
                        localField:'skill',
                        from:'skills',
                        as:'skillDetail'
                    }
                }
            ]);
            return {
                message: "employee skills reterives",
                response: empSkill,
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    async deleteEmployeeSkill(id){
        try{
            const ids = id?.map((i)=>new mongoose.Types.ObjectId(i))
            await employeeSkillModal.deleteMany({_id:{$in:ids}});
            return{
                response:{},
                message:"Employee Skill Deleted Successfully",
            }
        }catch(err){
            throw new Error(err.message);
        }
    }
}