import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class NoteComment{
    @Field(()=>ID)
    _id: ObjectId

    @Field(()=>ID)
    @Prop()
    noteId: ObjectId

    @Field(()=>ID)
    @Prop()
    commentedBy: ObjectId

    @Field(()=>String)
    @Prop()
    comment: string

    @Field(()=>String)
    @Prop({default: dayjs().format("DD/MM/YYYY HH:mm")})
    createdAt:string

    @Field(()=>String)
    @Prop({default: dayjs().format("DD/MM/YYYY HH:mm")})
    updatedAt:string
}

@InputType()
export class NoteCommentInput{
    
    @Field(()=>ID,{nullable: true})
    _id: ObjectId

    @Field(()=>ID,{nullable: true})
    @Prop()
    noteId: ObjectId

    @Field(()=>String,{nullable: true})
    @Prop()
    comment: string

}

@ObjectType()
export class NoteCommentResponse{
    @Field(()=>String)
    message: string

    @Field(()=>GraphQLJSON)
    response: any
}

export const NoteCommentModal = getModelForClass(NoteComment)