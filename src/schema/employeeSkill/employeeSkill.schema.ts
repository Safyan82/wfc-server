import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class EmployeeSkill{

    @Field(()=>ID)
    _id: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    employeeId: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    skill: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    categoryId: ObjectId

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    fields: any

    @Field(()=>Boolean, {nullable: true})
    @Prop({default: true})
    status: boolean

    @Field(()=>Boolean, {nullable: true})
    @Prop({default: false})
    isArchive: boolean

    @Field(()=>Boolean, {nullable: true})
    @Prop({default: false})
    isDeleted: boolean

    @Field(()=>ID, {nullable: true})
    @Prop()
    createdBy: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    updatedBy: ObjectId

    
    @Field(()=>String, {nullable: true})
    @Prop({default: dayjs().format("DD/MM/YYYY HH:mm")})
    createdAt: string

    @Field(()=>String, {nullable: true})
    @Prop()
    updatedAt: string


}

@InputType()
export class EmployeeSkillInput{
    
    @Field(()=>String, {nullable: true})
    _id: string

    @Field(()=>String, {nullable: true})
    employeeId: string

    @Field(()=>String, {nullable: true})
    skill: string

    @Field(()=>ID, {nullable: true})
    categoryId: ObjectId

    @Field(()=>GraphQLJSON, {nullable: true})
    fields: any

}


@ObjectType()
export class EmployeeSkillResponse{
    @Field(()=>String)
    message: string

    @Field(()=>GraphQLJSON)
    response: any
}

@InputType()
class EmployeeDeleteId{
    @Field(()=>String)
    id: string
}

@InputType()
export class EmployeeDeleteInput{
    @Field(()=>GraphQLJSON)
    id:[EmployeeDeleteId]
}


export const employeeSkillModal = getModelForClass(EmployeeSkill);