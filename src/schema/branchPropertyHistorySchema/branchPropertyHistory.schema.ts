import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class BranchPropertyHistory {
    @Field(()=>ID)
    _id: string

    @Field(()=>ID)
    @Prop()
    branchId: ObjectId

    @Field(()=>ID)
    @Prop()
    propertyId: ObjectId

    @Field(()=>String)
    @Prop()
    value: string

    @Field(()=>String)
    @Prop()
    createdBy: ObjectId

    @Field(()=>String)
    @Prop()
    createdAt:string
}

export const BranchPropertyHistoryModal = getModelForClass(BranchPropertyHistory);

@ObjectType()
export class BranchPropertyResponse {
    @Field(()=>String)
    message: string

    @Field(()=>Boolean)
    success: boolean

    @Field(()=>GraphQLJSON)
    response: any
}

@InputType()
export class BranchPropertyHistoryInput{
    @Field(()=>ID)
    branchId: ObjectId

    @Field(()=>ID)
    propertyId: ObjectId
    
    @Field(()=>String, {nullable: true})
    value: string

    @Field(()=>String, {nullable: true})
    createdBy: string
}