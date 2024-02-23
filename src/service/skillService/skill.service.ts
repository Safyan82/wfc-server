import { ObjectId } from "mongoose";
import { SkillInput, skillModal } from "../../schema/skillsSchema/skill.schema";


export class SkillService{
    async newSkill(input: SkillInput, _id){
        try{
            const skill = await skillModal.create({...input, createdBy:_id});
            return skill
            
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

            return skills?.map((sc)=>({...sc, categoryId: sc?.category[0]?.category, createdBy: sc?.createdByDetail[0]?.firstname+" "+sc?.createdByDetail[0]?.lastname}));
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

    async deleteSkill(_id){
        try{
            await skillModal.deleteOne({_id});
        }
        catch(err){
            throw new Error(err.message);
        }
    }

}