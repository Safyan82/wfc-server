import { ObjectId } from "mongoose";
import { SkillInput, skillModal } from "../../schema/skillsSchema/skill.schema";


export class SkillService{
    async newSkill(input: SkillInput){
        try{
            const skill = await skillModal.create(input);
            return skill
            
        }catch(err){
            throw new Error(err.message);
        }
    }

    async getSkills(){
        try{

            const skills = await skillModal.find();
            return skills
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