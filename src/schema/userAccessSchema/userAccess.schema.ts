import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class userAccess{
    @Field(()=>ID)
    _id: string

    @Field(()=>String,{nullable:true})
    @Prop()
    employeeId: ObjectId

    @Field(()=>String,{nullable:true})
    @Prop()
    userId: ObjectId

    @Field(()=>String,{nullable: true})
    @Prop()
    ip: string

    @Field(()=>GraphQLJSON,{nullable:true})
    @Prop()
    location: any

    
    @Field(()=>String,{nullable:true})
    @Prop({default: dayjs().format('DD-MM-YYYY HH:mm:ss')})
    accessedAt: string

    
    @Field(()=>GraphQLJSON,{nullable:true})
    @Prop({required: false})
    platform?:any;

    @Field(()=>Boolean,{nullable:true})
    @Prop({default: true})
    isActive?:boolean;
}

@ObjectType()
export class userAccessResponse extends userAccess{
    @Field(()=>GraphQLJSON, {nullable: true})
    employee: any
}

@ObjectType()
export class DeactivedResponse {
    @Field(()=>String)
    message: any
}

export const UserAccessModal = getModelForClass(userAccess);