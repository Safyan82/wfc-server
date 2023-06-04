import { prop, } from "@typegoose/typegoose";
import { type } from "os";
import {Field, ObjectType, } from "type-graphql";



@ObjectType()
export class KafkaMessage{
    @Field(()=>String)
    action:string;
    @Field(()=>String)
    timeStamp:string;
}

@ObjectType()
export class KafkaResponse{
    @Field(()=>String)
    message: string;
}

