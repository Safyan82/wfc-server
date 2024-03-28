import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class SiteArea{

    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    areaname: string

    @Field(()=>ID)
    @Prop()
    siteId: ObjectId

    @Field(()=>String)
    @Prop({default: dayjs().format("DD/MM/YYYY")})
    createdAt: string

}
    



@InputType()
export class siteAreaInput{

    @Field(()=>String)
    @Prop()
    areaname: string

    @Field(()=>String)
    @Prop()
    siteId: string
}

export const SiteAreaModal = getModelForClass(SiteArea);