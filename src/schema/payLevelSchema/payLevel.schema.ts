import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class PayLevel{
    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    name: string

    @Field(()=>String)
    @Prop()
    code: string

    @Field(()=>String)
    @Prop()
    createdAt: string

    @Field(()=>String)
    @Prop()
    createdBy: ObjectId

    @Field(()=>String)
    @Prop()
    updatedAt: string
}

@ObjectType()
export class PayLevelResponse{
    @Field(()=>GraphQLJSON)
    response: any

    @Field(()=>String)
    message: string
}

@InputType()
export class PayLevelInput{

    @Field(()=>String, {nullable: true})
    _id: string

    @Field(()=>String)
    name: string

    @Field(()=>String)
    code: string

}


export const PayLevelModal = getModelForClass(PayLevel);