import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class SiteArea{

    @Field(()=>ID, {nullable: true})
    _id: string

    @Field(()=>String, {nullable: true})
    @Prop()
    areaname: string

    @Field(()=>ID, {nullable: true})
    @Prop()
    siteId: ObjectId

    @Field(()=>Boolean, {nullable: true})
    @Prop({default: false})
    isDeleted: boolean

    @Field(()=>String, {nullable: true})
    @Prop({default: dayjs().format("DD/MM/YYYY")})
    createdAt: string

}
    



@InputType()
export class siteAreaInput{

    @Field(()=>String, {nullable: true})
    @Prop()
    id: string

    @Field(()=>String, {nullable: true})
    @Prop()
    areaname: string

    @Field(()=>String, {nullable: true})
    @Prop()
    siteId: string
}

export const SiteAreaModal = getModelForClass(SiteArea);