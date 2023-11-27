import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class EmployeePropertyHistory {
    @Field(()=>ID)
    _id: string

    @Field(()=>ID)
    @Prop()
    employeeId: ObjectId

    @Field(()=>ID)
    @Prop()
    propertyId: ObjectId

    @Field(()=>String)
    @Prop()
    value: string

    @Field(()=>String)
    @Prop()
    createdBy: string

    @Field(()=>String)
    @Prop()
    createdAt:string
}

export const EmployeePropertyHistoryModal = getModelForClass(EmployeePropertyHistory);

@ObjectType()
export class EmployeePropertyResponse {
    @Field(()=>String)
    message: string

    @Field(()=>Boolean)
    success: boolean

    @Field(()=>GraphQLJSON)
    response: any
}

@InputType()
export class EmployeePropertyHistoryInput{
    @Field(()=>ID)
    employeeId: ObjectId

    @Field(()=>ID)
    propertyId: ObjectId
    
    @Field(()=>String, {nullable: true})
    value: string

    @Field(()=>String, {nullable: true})
    createdBy: string
}