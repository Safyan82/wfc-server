import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";
// skill category

@ObjectType()
export class SkillCategory{

    @Field(()=>ID)
    _id: ObjectId

    @Field(()=>String)
    @Prop()
    category: string

    @Field(()=>ID)
    @Prop()
    createdBy: ObjectId

    @Field(()=>String)
    @Prop({default: dayjs().format("DD/MM/YYYY HH:mm")})
    createdAt: string

    @Field(()=>ID)
    @Prop()
    updatedBy: ObjectId

    
    @Field(()=>String)
    @Prop()
    updatedAt: string

}

@ObjectType()
export class SkillCategoryResponse extends SkillCategory{
    @Field(()=>GraphQLJSON)
    createdByDetail: any
}

@InputType()
export class SkillCategoryInput{
    
    @Field(()=>String)
    @Prop()
    category: string
}

export const SkillCategoryModal = getModelForClass(SkillCategory);