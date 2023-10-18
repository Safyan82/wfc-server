import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Note{
    @Field(()=>ID)
    _id:string

    @Field(()=>String)
    @Prop()
    note: string

    @Field(()=>Boolean,{nullable:true, defaultValue:0, description:'This variable use on frontend side just to pin the comment'})
    @Prop()
    pinned?: boolean

    @Field(()=>String,{nullable: true})
    @Prop()
    createdBy?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    visibility?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    branchId?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    category?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    followUp?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    updatedBy?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    createdAt?: string

    @Field(()=>Boolean,{nullable:true})
    @Prop()
    isdeleted?: boolean
}

export const noteModal = getModelForClass(Note);


@ObjectType()
export class noteGenericResponse{
    @Field(()=>GraphQLJSON)
    note: JSON

    @Field(()=>String,{nullable: true})
    createdBy: string

    @Field(()=>Boolean)
    success: boolean

    @Field(()=>String,{nullable: true})
    message: string

}

@InputType()
export class NoteInput{

    @Field(()=>String,{nullable:true})
    _id?: string

    @Field(()=>String)
    note: string

    @Field(()=>String,{nullable:true})
    createdBy?: string

    @Field(()=>String,{nullable:true})
    visibility?: string

    @Field(()=>String)
    branchId?: string

    @Field(()=>String)
    category?: string

    @Field(()=>String)
    followUp?: string

    @Field(()=>Boolean,{nullable:true})
    pin?: boolean

    @Field(()=>Boolean, {nullable: true})
    isdeleted?: boolean

}