import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Skill{

    @Field(()=>ID)
    _id:string

    @Field(()=>String)
    @Prop()
    skill: string

    @Field(()=>ID)
    @Prop()
    categoryId: ObjectId

    @Field(()=>Boolean)
    @Prop()
    anyDate: boolean

    @Field(()=>GraphQLJSON)
    @Prop()
    dateField: any

    @Field(()=>Boolean)
    @Prop()
    digitalCertificate: boolean

    @Field(()=>GraphQLJSON)
    @Prop()
    digitalFields: any

    @Field(()=>ID)
    @Prop()
    createdBy: ObjectId

    @Field(()=>String)
    @Prop()
    createdAt: string
}

@InputType()
export class SkillInput{

    @Field(()=>String)
    @Prop()
    skill: string

    @Field(()=>String)
    @Prop()
    category: string

    @Field(()=>Boolean)
    @Prop()
    anyExpiry: boolean

    @Field(()=>Boolean)
    @Prop()
    digitalCertificate: boolean
}

@ObjectType()
export class skillResponse{
    @Field(()=>String)
    message: string
}

export const skillModal = getModelForClass(Skill);

