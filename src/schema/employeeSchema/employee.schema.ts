import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Employee{
    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    branchid: string

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
    branchid: string
    
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