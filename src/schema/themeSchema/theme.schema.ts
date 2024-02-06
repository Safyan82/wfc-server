import { Prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Theme{
    @Field(()=>ID)
    _id: string

    @Field(()=>String, {nullable: true})
    @Prop()
    userId: ObjectId

    @Field(()=>String, {nullable: true})
    @Prop()
    color: string
}


@InputType()
export class ThemeInput{

    @Field(()=>String)
    userId: ObjectId

    @Field(()=>String)
    color: string

}

export const ThemeModal = getModelForClass(Theme);