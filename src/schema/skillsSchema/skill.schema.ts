import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Skill{

    @Field(()=>ID)
    _id:string

    @Field(()=>String, {nullable: true})
    @Prop()
    skill: string

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    fields: any

    @Field(()=>String, {nullable: true})
    @Prop()
    description: string

    @Field(()=>ID, {nullable: true})
    @Prop()
    categoryId: ObjectId

    @Field(()=>Boolean, {nullable: true})
    @Prop()
    hardSkill: boolean

    @Field(()=>Boolean, {nullable: true})
    @Prop()
    anyDate: boolean

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    dateFields: any

    @Field(()=>Boolean, {nullable: true})
    @Prop()
    digitalCertificate: boolean

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    digitalFields: any

    @Field(()=>ID, {nullable: true})
    @Prop()
    createdBy: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    updatedBy: ObjectId

    @Field(()=>String, {nullable: true})
    @Prop({default:dayjs().format("DD/MM/YYYY HH:mm:ss")})
    createdAt: string

    @Field(()=>String, {nullable: true})
    @Prop()
    updatedAt: string
}

@ObjectType()
export class SkillResponse extends Skill{
    @Field(()=>String, {nullable: true})
    categoryName: string
}

@InputType()
export class SkillInput{
    
    @Field(()=>ID, {nullable: true})
    _id:string

    @Field(()=>String, {nullable: true})
    @Prop()
    skill: string

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    fields: any

    @Field(()=>String, {nullable: true})
    @Prop()
    description: string

    @Field(()=>ID, {nullable: true})
    @Prop()
    categoryId: ObjectId

    @Field(()=>Boolean, {nullable: true})
    @Prop()
    anyDate: boolean

    @Field(()=>Boolean)
    @Prop()
    hardSkill: boolean

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    dateFields: any

    @Field(()=>Boolean, {nullable: true})
    @Prop()
    digitalCertificate: boolean

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    digitalFields: any

    @Field(()=>ID, {nullable: true})
    @Prop()
    createdBy: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    updatedBy: ObjectId

}

@InputType()
class skillIds {
    @Field(()=>String)
    id:string
}

@InputType()
export class BulkInput{
    @Field(()=>GraphQLJSON)
    id:[skillIds]
}

@ObjectType()
export class skillResponse{
    @Field(()=>String)
    message: string
}

export const skillModal = getModelForClass(Skill);

