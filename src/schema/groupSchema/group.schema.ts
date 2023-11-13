import { Prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Group{

    @Field(()=>ID,{nullable:true})
    _id?:string

    @Field(()=>String,{nullable:true})
    key?:string

    @Field(()=>String,{nullable:true})
    @Prop()
    name: string

    @Field(()=>Number,{defaultValue:0})
    @Prop()
    properties: number

    @Field(()=>String)
    @Prop()
    objectType: string

    @Field(()=>String)
    @Prop()
    createdBy: String

    @Field(()=>String)
    @Prop()
    updatedBy: String

    @Field(()=>String)
    @Prop()
    createdAt: string

    @Field(()=>String)
    @Prop()
    updatedAt: string

    @Field(()=>Boolean,{defaultValue: 0})
    @Prop()
    isDeleted: boolean
}


// return response of create group

@ObjectType()
export class createGroupResponse{
    @Field(()=>String)
    message: string

    @Field(()=>Boolean)
    success: boolean
}

@InputType()
export class GroupInput{
    @Field(()=>ID,{nullable: true})
    groupId?: string

    @Field(()=>String,{nullable: true})
    name?: string

    @Field(()=>String,{nullable: true})
    objectType?: string

    @Field(()=>String, {nullable: true})
    createdBy?: string
}

export const GroupModal = getModelForClass(Group);