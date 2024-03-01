import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class note{
    @Field(()=>ID)
    _id: ObjectId

    @Field(()=>String)
    @Prop()
    note: string

    @Field(()=>ID)
    @Prop()
    createdFor: ObjectId

    @Field(()=>String)
    @Prop()
    objectType: string

    @Field(()=>ID)
    @Prop()
    createdBy: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    updatedBy: ObjectId
    
    @Field(()=>String)
    @Prop({default: dayjs().format("DD/MM/YYYY HH:mm")})
    createdAt: string
    
    @Field(()=>String, {nullable: true})
    @Prop()
    updatedAt: string

    
}

@InputType()
export class NoteInput{

    @Field(()=>String, {nullable: true})
    _id: string
    
    @Field(()=>String)
    note: string

    @Field(()=>String)
    objectType: string

    @Field(()=>ID)
    createdFor: ObjectId

}

@ObjectType()
export class NoteResponse{
    @Field(()=>String)
    message: string

    @Field(()=>GraphQLJSON)
    response: any
}


export const noteModal = getModelForClass(note);