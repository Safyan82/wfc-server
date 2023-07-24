import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class BranchObject{
    @Field(()=>ID)
    _id: string

    @Field(()=>ID)
    @Prop()
    propertyId: ObjectId

    @Field(()=>Boolean)
    @Prop()
    isMandatory: boolean

    @Field(()=>Boolean)
    @Prop()
    isReadOnly: boolean

    @Field(()=> String)
    date: string
}


@InputType()
export class branchObjectInput{
    @Field(()=>ID)
    propertyId: ObjectId

    @Field(()=>Boolean)
    isMandatory: boolean
}

@InputType()
class Ids {
    @Field(()=>ID)
    id: ObjectId
}

@InputType()
export class DeleteBranchObjectInput{
    @Field(()=>GraphQLJSON)
    properties: [Ids]
}


@InputType()
export class BulkBranchObjectInput {
    @Field(()=>[branchObjectInput])
    fields: [branchObjectInput]
}

export const branchObjectModal = getModelForClass(BranchObject);


@ObjectType()
export class GenericBranchObjectTypeResponse{
    @Field(()=>GraphQLJSON)
    response:any
}