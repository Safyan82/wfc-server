import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SkillCategoryService } from "../../service/skillCategoryService/skillCategory.service";
import { CategoryBulkDeleteInput, SkillCategory, SkillCategoryGenericResponse, SkillCategoryInput } from "../../schema/skillCategory/skillCategory.schema";
import { Context } from "../../utils/context";
import mongoose from "mongoose";

@Resolver()
export class SkillCategoryResolver{
    constructor(private skillCategoryService: SkillCategoryService){
        this.skillCategoryService = new SkillCategoryService();
    }

    @Authorized()
    @Mutation(()=>SkillCategory)
    async newSkillCategory(@Ctx() ctx:Context, @Arg('input') input:SkillCategoryInput){
        return this.skillCategoryService.newSkillCategory(input, ctx?.user?._id);
    }

    @Authorized()
    @Mutation(()=>SkillCategory)
    async updateSkillCategory(@Ctx() ctx:Context, @Arg('input') input:SkillCategoryInput){
        return this.skillCategoryService.updateSkillCategory(input, ctx?.user?._id);
    }

    @Authorized()
    @Query(()=>[SkillCategory])
    async getSkillCategories(){
        return this.skillCategoryService.getSkillCategories();
    }

    @Authorized()
    @Mutation(()=>SkillCategoryGenericResponse)
    async deleteSkillCategory(@Arg('input') input: CategoryBulkDeleteInput){
        
        const ids = input?.id?.map((_id)=> (new mongoose.Types.ObjectId(_id)));
        return this.skillCategoryService.deleteSkillCategory(ids);
    }


}