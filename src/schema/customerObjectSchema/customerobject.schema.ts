import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class CustomerObject{
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
export class customerObjectInput{
    @Field(()=>ID)
    propertyId: ObjectId
    
    @Field(()=>Boolean, {nullable:true})
    isMandatory: boolean

    @Field(()=>Number, {nullable: true})
    order: number
}

@InputType()
export class BulkCustomerObjectInput {
    @Field(()=>[customerObjectInput])
    fields: [customerObjectInput]
}

@InputType()
class Ids {
    @Field(()=>ID)
    id: ObjectId
}

@InputType()
export class DeleteCustomerObjectInput{
    @Field(()=>GraphQLJSON)
    properties: [Ids]
}



export const customerObjectModal = getModelForClass(CustomerObject);


@ObjectType()
export class GenericCustomerObjectResponse{
    @Field(()=>GraphQLJSON)
    response:any
}