import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class userAccess{
    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    employeeId: ObjectId

    @Field(()=>String)
    @Prop()
    userId: ObjectId

    @Field(()=>String)
    @Prop()
    ip: string

    @Field(()=>GraphQLJSON)
    @Prop()
    location: any

    
    @Field(()=>String)
    @Prop({default: dayjs().format('DD-MM-YYYY HH:mm:ss')})
    accessedAt: string

}

@ObjectType()
export class userAccessResponse extends userAccess{
    @Field(()=>GraphQLJSON)
    employee: any
}

export const UserAccessModal = getModelForClass(userAccess);