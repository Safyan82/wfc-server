import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class AgencyObject{
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
export class AgencyObjectInput{
    @Field(()=>ID)
    propertyId: ObjectId
    
    @Field(()=>Boolean, {nullable:true})
    isMandatory: boolean

    @Field(()=>Number, {nullable: true})
    order: number
}

@InputType()
export class BulkAgencyObjectInput {
    @Field(()=>[AgencyObjectInput])
    fields: [AgencyObjectInput]
}

@InputType()
class Ids {
    @Field(()=>ID)
    id: ObjectId
}

@InputType()
export class DeleteAgencyObjectInput{
    @Field(()=>GraphQLJSON)
    properties: [Ids]
}



export const AgencyObjectModal = getModelForClass(AgencyObject);


@ObjectType()
export class GenericAgencyObjectResponse{
    @Field(()=>GraphQLJSON, {nullable: true})
    response:any
}