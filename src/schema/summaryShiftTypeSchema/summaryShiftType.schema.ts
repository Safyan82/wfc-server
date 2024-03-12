import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class SummaryShiftType{

    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    name: string

    @Field(()=>String)
    @Prop()
    description: string

    @Field(()=>String)
    @Prop()
    reporthour: string
    

    @Field(()=>ID, {nullable: true})
    @Prop()
    createdBy: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    updatedBy: ObjectId

}


@InputType()
export class SummaryShiftTypeInput{
    
    @Field(()=>String, {nullable: true})
    _id: string

    @Field(()=>String, {nullable: true})
    @Prop()
    name: string

    @Field(()=>String, {nullable: true})
    @Prop()
    description: string

    @Field(()=>String, {nullable: true})
    @Prop()
    reporthour: string

}

@ObjectType()
export class SummaryShiftTypeResponse{

    @Field(()=>String)
    message: string

    @Field(()=>GraphQLJSON)
    response: any
}


export const SummaryShiftTypeModal = getModelForClass(SummaryShiftType);