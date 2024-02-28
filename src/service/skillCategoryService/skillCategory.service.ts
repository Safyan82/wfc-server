import dayjs from "dayjs";
import { SkillCategoryModal } from "../../schema/skillCategory/skillCategory.schema";
import { skillModal } from "../../schema/skillsSchema/skill.schema";

export class SkillCategoryService{
    
    async newSkillCategory(input, _id){
        try{
            const category = await SkillCategoryModal.create({
                ...input,
                createdBy: _id
            });
            return category;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async updateSkillCategory(input, userId){
        try{
            const {_id, ...rest} = input;
            const category = await SkillCategoryModal.updateOne({_id},{
                $set:{
                    ...rest,
                    updatedBy: userId,
                    updatedAt: dayjs()
                }
            });
            return category;
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async getSkillCategories(){
        try{
            const skillCategory = await SkillCategoryModal.aggregate([
                {
                    $lookup:{
                        from:'users',
                        foreignField:'_id',
                        localField:'createdBy',
                        as:'createdByUser',
                    },
                },
                { $unwind: "$createdByUser" },
                {
                    $lookup: {
                        from: "employees",
                        localField: "createdByUser.employeeId",
                        foreignField: "_id",
                        as: "createdByDetail"
                    }
                },

            ]);
            return skillCategory.map((sc)=>({...sc, createdBy:sc?.createdByDetail[0]?.firstname +' '+ sc?.createdByDetail[0]?.lastname}));
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async deleteSkillCategory(ids){
        try{
            const isCategoryInUser = await skillModal.find({categoryId:{$in:ids}});
            if(isCategoryInUser?.length>0){
                if(ids?.length==1){

                    throw new Error("Category is in use");
                }else{
                    throw new Error("One or more of these category is in use");

                }
            }else{

                await SkillCategoryModal.deleteMany({_id:{$in:ids}});
                return {
                    message: "Skill Category Deleted Successfully",
                }
            }
        }catch(err){
            throw new Error(err);
        }
    }
}