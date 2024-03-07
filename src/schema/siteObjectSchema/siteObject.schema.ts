import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class SiteObject{
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
    @Prop()
    date: string

    @Field(()=> Number)
    @Prop()
    order: number
}


@InputType()
export class siteObjectInput{
    @Field(()=>ID)
    propertyId: ObjectId
    
    @Field(()=>Boolean, {nullable:true})
    isMandatory: boolean

    @Field(()=>Number, {nullable: true})
    order: number
}

@InputType()
class Ids {
    @Field(()=>ID)
    id: ObjectId
}

@InputType()
export class DeleteSiteObjectInput{
    @Field(()=>GraphQLJSON)
    properties: [Ids]
}


@InputType()
export class BulkSiteObjectInput {
    @Field(()=>[siteObjectInput])
    fields: [siteObjectInput]
}

export const siteObjectModal = getModelForClass(SiteObject);


@ObjectType()
export class GenericSiteObjectTypeResponse{
    @Field(()=>GraphQLJSON)
    response:any
}