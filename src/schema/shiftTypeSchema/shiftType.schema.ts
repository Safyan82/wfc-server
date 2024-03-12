import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class ShiftType{
    
    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    name: string

    @Field(()=>String)
    @Prop()
    description: string

    @Field(()=>ID)
    @Prop()
    summaryShiftTypeId: ObjectId

    @Field(()=>String, {nullable: true})
    @Prop()
    payCode: string

    @Field(()=>ID)
    @Prop()
    payColumn: ObjectId

    @Field(()=>String, {nullable: true})
    @Prop()
    payMethod: string

    @Field(()=>String, {nullable: true})
    @Prop()
    payMultiplier: string


    @Field(()=>String, {nullable: true})
    @Prop()
    billCode: string

    @Field(()=>ID)
    @Prop()
    billColumn: ObjectId

    @Field(()=>String, {nullable: true})
    @Prop()
    billMethod: string

    @Field(()=>String, {nullable: true})
    @Prop()
    billMultiplier: string


}



@InputType()

@ObjectType()
export class ShiftTypeInput{
    
    @Field(()=>String,{nullable: true})
    _id: string

    @Field(()=>String,{nullable: true})
    @Prop()
    name: string

    @Field(()=>String,{nullable: true})
    @Prop()
    description: string

    @Field(()=>String,{nullable: true})
    @Prop()
    summaryShiftTypeId: string

    @Field(()=>String, {nullable: true})
    @Prop()
    payCode: string

    @Field(()=>String, {nullable: true})
    @Prop()
    payColumn: string

    @Field(()=>String, {nullable: true})
    @Prop()
    payMethod: string

    @Field(()=>String, {nullable: true})
    @Prop()
    payMultiplier: string


    @Field(()=>String, {nullable: true})
    @Prop()
    billCode: string

    @Field(()=>String, {nullable: true})
    @Prop()
    billColumn: string

    @Field(()=>String, {nullable: true})
    @Prop()
    billMethod: string

    @Field(()=>String, {nullable: true})
    @Prop()
    billMultiplier: string

    @Field(()=>ID, {nullable: true})
    @Prop()
    createdBy: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    updatedBy: ObjectId

}

@ObjectType()
export class ShiftTypeResponse{
    

    @Field(()=>String)
    message: string

    @Field(()=>GraphQLJSON)
    response: any

}

export const ShiftTypeModal = getModelForClass(ShiftType);