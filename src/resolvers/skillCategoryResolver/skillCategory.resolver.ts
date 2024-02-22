import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SkillCategoryService } from "../../service/skillCategoryService/skillCategory.service";
import { SkillCategory, SkillCategoryInput } from "../../schema/skillCategory/skillCategory.schema";
import { Context } from "../../utils/context";

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
    @Query(()=>[SkillCategory])
    async getSkillCategories(){
        return this.skillCategoryService.getSkillCategories();
    }
}