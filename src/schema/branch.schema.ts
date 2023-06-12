import { Field, InputType, ObjectType } from "type-graphql";
import GraphQLJSON from 'graphql-type-json';
import { getModelForClass, prop } from "@typegoose/typegoose";
import { MinLength } from "class-validator";

@ObjectType()
export class Branch{
    @Field(()=>String)
    _id: string;

    @Field(()=>String)
    @prop()
    branchName:string;

    @Field(()=>String,{nullable:true})
    @prop()
    postCode:string;

    @Field(()=>GraphQLJSON)
    @prop()
    metadata:any;

}

@ObjectType()
export class Branches{
    @Field(()=>[Branch])
    branches:Branch[]
}


@InputType()
export class createBranchInput{

    @MinLength(2,{
        message: "Please enter meaningfull branch name",
    })
    @Field(()=>String)
    branchName:String

    @Field(()=>String)
    postCode:String

    @Field(()=>GraphQLJSON,{nullable:true})
    metadata:any
}


export const BranchModal = getModelForClass(Branch);