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
    branchname:string;

    @Field(()=>String,{nullable:true})
    @prop()
    postcode:string;

    @Field(()=>GraphQLJSON,{nullable:true})
    @prop()
    metadata:any;

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

    @Field(()=>GraphQLJSON)
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


export const BranchModal = getModelForClass(Branch);