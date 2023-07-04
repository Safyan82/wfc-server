import { getModelForClass, prop } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class BranchField{
    
    @Field(()=>String)
    _id: string

    @Field(()=>String)
    @prop()
    name: string

    @Field(()=>String)
    @prop()
    type: string

    @Field(()=>String)
    @prop()
    label: string


    @Field(()=>String)
    @prop()
    placeholder: string

    @Field(()=>String)
    @prop()
    ownerId: string

    @Field(()=>GraphQLJSON)
    @prop()
    metadata: any

    @Field(()=>Number)
    @prop()
    order: number

    @Field(()=>Boolean)
    @prop()
    isDeleted: Boolean

    @Field(()=>String)
    @prop()
    createdAt: string

    @Field(()=>String)
    @prop()
    updatedAt: string    

}

@InputType()
export class BranchFieldInput{
    
    @Field(()=>String)
    name: string

    @Field(()=>String)
    type: string

    @Field(()=>String)
    label: string

    @Field(()=>String)
    placeholder: string

    @Field(()=>GraphQLJSON,{nullable:true})
    metadata: any

    @Field(()=>String)
    ownerId: string

    @Field(()=>Number)
    order: number


    @Field(()=>Boolean)
    isDeleted: Boolean

}

export const BranchFieldModal = getModelForClass(BranchField);