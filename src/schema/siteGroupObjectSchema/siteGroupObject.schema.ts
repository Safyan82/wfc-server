import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class SiteGroupObject{
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
export class siteGroupObjectInput{
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
export class DeleteSiteGroupObjectInput{
    @Field(()=>GraphQLJSON)
    properties: [Ids]
}


@InputType()
export class BulkSiteGroupObjectInput {
    @Field(()=>[siteGroupObjectInput])
    fields: [siteGroupObjectInput]
}

export const siteGroupObjectModal = getModelForClass(SiteGroupObject);


@ObjectType()
export class GenericSiteGroupObjectTypeResponse{
    @Field(()=>GraphQLJSON,{nullable: true})
    response:any
}