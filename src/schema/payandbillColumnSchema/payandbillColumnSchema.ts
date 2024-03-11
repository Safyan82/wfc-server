import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class PayandBillColumn{
    @Field(()=>ID)
    _id:string

    @Field(()=>String)
    @Prop()
    columnName:string

    @Field(()=>Number)
    @Prop()
    columnOrder: number

    @Field(()=>ID)
    @Prop()
    createdBy: ObjectId

    @Field(()=>String)
    @Prop({default: dayjs().format("DD/MM-YYYY HH:mm")})
    createdAt: string

    @Field(()=>ID)
    @Prop()
    updatedBy: ObjectId

    @Field(()=>String)
    @Prop()
    updatedAt: string
}

@ObjectType()
export class PayandBillColumnResponse{
    @Field(()=>String)
    message: string

    @Field(()=>GraphQLJSON)
    response: any
}


@InputType()
export class PayandBillColumnInput{
    @Field(()=>ID, {nullable: true})
    _id:string

    @Field(()=>String)
    @Prop()
    columnName:string

    @Field(()=>Number)
    @Prop()
    columnOrder: number
}


export const PayandBillColumnModal = getModelForClass(PayandBillColumn);