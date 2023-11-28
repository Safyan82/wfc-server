import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Employee{
    @Field(()=>ID)
    _id: string

    @Field(()=>ID)
    @Prop()
    branch: ObjectId

    @Field(()=>String)
    @Prop()
    firstname: string

    @Field(()=>String)
    @Prop()
    lastname: string

    @Field(()=>GraphQLJSON)
    @Prop()
    metadata: any
    
    @Field(()=>String)
    @Prop()
    createdAt: string

    @Field(()=>String)
    @Prop()
    updatedAt: string
}

@InputType()
export class EmployeeInput{
    @Field(()=>String)
    branch: string
    
    @Field(()=>String)
    firstname: string

    @Field(()=>String)
    lastname: string

    @Field(()=>GraphQLJSON)
    metadata: any
};

@ObjectType()
export class EmployeeGenericResponse{

    @Field(()=>String, {nullable: true})
    message: string

    @Field(()=>GraphQLJSON, {nullable: true})
    response: any
};

@InputType()
export class EmployeeFilter{
    @Field(()=>GraphQLJSON, {nullable:true})
    filters: any
}

export const employeeModal = getModelForClass(Employee);

@InputType()
export class EmployeeUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>String)
    _id: string
}

@InputType()
export class BulkEmployeeUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>GraphQLJSON)
    _ids: any
}