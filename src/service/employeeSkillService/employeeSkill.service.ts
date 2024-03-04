import dayjs from "dayjs";
import { employeeSkillModal } from "../../schema/employeeSkill/employeeSkill.schema";
import mongoose from "mongoose";

export class EmployeeSkillService{

    async newEmployeeSkill(input, userId){
        try{
            const isExist = await employeeSkillModal.findOne({skill: input?.skill, isArchive: false});
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

    async updateEmployeeSkill(input, userId){
        const {_id, ...rest} = input;
        try{
            const existingSkill = await employeeSkillModal.findById({_id});
            if(existingSkill){
                const {skill, categoryId} = existingSkill;
                await employeeSkillModal.updateOne({_id},{$set:{isArchive: true, updatedBy: userId, updatedAt: dayjs().format("DD/MM/YYYY HH:mm")}});
                await employeeSkillModal.create({skill, categoryId, ...rest, createdBy: userId, createdAt: dayjs().format("DD/MM/YYYY HH:mm")});
            }
            return{
                response: {},
                message: "Employee Skill Updated Successfully",
            }
        }catch(err){
            throw new Error("An error has been occured"+err.message);
        }
    }

    async getEmployeeSkill(employeeId,condition){
        try{
            const empSkill = await employeeSkillModal.aggregate([
                {
                    $match: {
                        $and:[
                            {
                                employeeId: new mongoose.Types.ObjectId(employeeId),
                            },
                            {
                                isArchive: condition=="all"?  false: true
                            }
                        ]

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
                        localField:'updatedBy',
                        from:'employees',
                        as:'updatedBy'
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

    async deleteEmployeeSkill(id, userId){
        try{
            const ids = id?.map((i)=>new mongoose.Types.ObjectId(i))
            await employeeSkillModal.updateMany({_id:{$in:ids}},{$set:{isDeleted:false, isArchive:true, updatedAt: dayjs().format("DD/MM/YYYY HH:mm"), updatedBy: userId}});
            return{
                response:{},
                message:"Employee Skill Deleted Successfully",
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

}