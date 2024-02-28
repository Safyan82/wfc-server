import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SkillService } from "../../service/skillService/skill.service";
import { BulkInput, Skill, SkillInput, SkillResponse, skillResponse } from "../../schema/skillsSchema/skill.schema";
import mongoose from "mongoose";
import { Context } from "../../utils/context";

@Resolver()
export class SkillResolver{
    
    constructor(private skillService: SkillService){
        this.skillService = new SkillService();
    }

    @Authorized()
    @Mutation(()=>Skill)
    async newSkill(@Ctx() ctx:Context, @Arg('input', {validate: true}) input:SkillInput){
        return this.skillService.newSkill(input, ctx?.user?._id);
    }

    @Authorized()
    @Query(()=>[SkillResponse])
    async getSkills(){
        return this.skillService.getSkills();
    }

    // @Authorized()
    @Mutation(()=>skillResponse)
    async deleteSkill(@Arg('deleteSkills') deleteSkills:BulkInput){
        
        const ids = deleteSkills?.id?.map((_id)=> (new mongoose.Types.ObjectId(_id)));
        return this.skillService.deleteSkill(ids)
    }

}