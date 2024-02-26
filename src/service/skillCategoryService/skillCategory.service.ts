import { SkillCategoryModal } from "../../schema/skillCategory/skillCategory.schema";

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
            await SkillCategoryModal.deleteMany({_id:{$in:ids}});
            return {
                message: "Skill Category Deleted Successfully",
            }
        }catch(err){
            throw new Error(err);
        }
    }
}