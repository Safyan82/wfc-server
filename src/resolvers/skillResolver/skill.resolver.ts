import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { SkillService } from "../../service/skillService/skill.service";
import { Skill, SkillInput, skillResponse } from "../../schema/skillsSchema/skill.schema";
import mongoose from "mongoose";

@Resolver()
export class SkillResolver{
    
    constructor(private skillService: SkillService){
        this.skillService = new SkillService();
    }

    @Authorized()
    @Mutation(()=>Skill)
    async newSkill(@Arg('input', {validate: true}) input:SkillInput){
        return this.skillService.newSkill(input);
    }

    @Authorized()
    @Query(()=>[Skill])
    async getSkills(){
        return this.skillService.getSkills();
    }

    @Authorized()
    @Mutation(()=>skillResponse)
    async deleteSkill(@Arg('id') id:string){
        const _id = new mongoose.Types.ObjectId(id);
        return this.skillService.deleteSkill(_id)
    }

}