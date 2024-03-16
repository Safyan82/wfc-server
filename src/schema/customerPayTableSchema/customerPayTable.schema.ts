import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class CustomerPayTable{
    @Field(()=>ID)
    _id: string

    @Field(()=>ID)
    @Prop()
    payLevelId: ObjectId

    @Field(()=>GraphQLJSON)
    @Prop()
    payTableMeta: any

    @Field(()=>String)
    @Prop()
    createdAt: string

}

@InputType()
export class CustomerPayTableInput{

    @Field(()=>ID, {nullable: true})
    @Prop()
    payLevelId: ObjectId

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    payTableMeta: any

}

@ObjectType()
export class CustomerPayTableResponse{

    @Field(()=>GraphQLJSON)
    response: any

    @Field(()=>String)
    message: string

}


export const CustomerPayTableModal = getModelForClass(CustomerPayTable);