import mongoose, { ObjectId } from "mongoose";
import { SkillInput, skillModal } from "../../schema/skillsSchema/skill.schema";
import { employeeSkillModal } from "../../schema/employeeSkill/employeeSkill.schema";


export class SkillService{
    async newSkill(input: SkillInput, _id){
        try{
            const isExist  = await skillModal.findOne({$and:[{skill:input?.skill}, {categoryId: new mongoose.Types.ObjectId(input?.categoryId)}]});
            if(isExist){
                throw new Error("Skill Already Exist");   
            }else{

                const skill = await skillModal.create({...input, createdBy:_id});
                return skill
            }
            
        }catch(err){
            throw new Error(err.message);
        }
    }

    async getSkills(){
        try{
            const skills = await skillModal.aggregate([
                {
                    $lookup:{
                        foreignField:'_id',
                        localField:'createdBy',
                        as:'users',
                        from:'users'
                    },
                },
                
                { $unwind: "$users" },

                {
                    $lookup: {
                        from: "employees",
                        localField: "users.employeeId",
                        foreignField: "_id",
                        as: "createdByDetail"
                    }
                },
               
                {
                    $lookup: {
                        from: "skillcategories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "category"
                    }
                },

            ]);

            return skills?.map((sc)=>({...sc, categoryName: sc?.category[0]?.category, createdBy: sc?.createdByDetail[0]?.firstname+" "+sc?.createdByDetail[0]?.lastname}));
        }catch(err){
            throw new Error(err.message);
        }
    }

    async updateSkill(input: SkillInput){
        try{

        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async deleteSkill(_ids){
        try{
            // check if this skill is in user
            const isInUser = await employeeSkillModal?.find({skill:{$in:_ids}});
            console.log(isInUser, "isInUser");
            if(isInUser?.length>0){
                throw new Error("Action omitted ! This skill is in use");
            }else{

                await skillModal.deleteMany({_id:{$in:_ids}});
                return {
                    message: "Skills deleted successfully"
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }

}