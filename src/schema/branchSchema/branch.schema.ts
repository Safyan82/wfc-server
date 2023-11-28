import { Field, InputType, ObjectType } from "type-graphql";
import GraphQLJSON from 'graphql-type-json';
import { Prop, getModelForClass, prop } from "@typegoose/typegoose";
import { MinLength } from "class-validator";
import { Date } from "mongoose";

@ObjectType()
export class Branch{
    @Field(()=>String)
    _id: string;

    @Field(()=>String)
    @prop()
    branchname:string;

    @Field(()=>String,{nullable:true})
    @prop()
    postcode:string;

    @Field(()=>GraphQLJSON,{nullable:true})
    @prop()
    metadata:any;

    @Field(()=>String)
    @Prop()
    createdDate: string

    @Field(()=>String)
    @Prop()
    updatedDate: string

}

@ObjectType()
export class Branches{
    @Field(()=>[Branch])
    branches:Branch[]
}

@ObjectType()
export class BranchGenericResponse{
    @Field(()=>Boolean)
    success:Boolean

    @Field(()=>String)
    message:string

    @Field(()=>GraphQLJSON, {nullable: true})
    response: any
}



@InputType()
export class createBranchInput{

    @MinLength(2,{
        message: "Please enter meaningfull branch name",
    })
    @Field(()=>String)
    branchname:String

    @Field(()=>String)
    postcode:String

    @Field(()=>GraphQLJSON,{nullable:true})
    metadata:any
}


@InputType()
export class BranchFilter{
    @Field(()=>GraphQLJSON, {nullable:true})
    filters: any
}

@InputType()
export class BranchUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>String)
    _id: string
}


@InputType()
export class BulkBranchUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>GraphQLJSON)
    _ids: any
}

export const BranchModal = getModelForClass(Branch);