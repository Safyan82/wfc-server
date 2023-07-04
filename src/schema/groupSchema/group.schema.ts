import { Prop, getModelForClass } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Group{
    @Field(()=>String,{nullable:true})
    key?:string

    @Field(()=>String)
    @Prop()
    name: string

    @Field(()=>Number,{nullable:true, defaultValue:0})
    @Prop()
    properties?: number

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
    @Field(()=>String,{nullable: true})
    groupId: String

    @Field(()=>String)
    name: String

    @Field(()=>String, {nullable: true})
    createdBy?: string
}

export const GroupModal = getModelForClass(Group);