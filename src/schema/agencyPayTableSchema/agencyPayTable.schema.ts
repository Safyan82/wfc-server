import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class AgencyPayTable{
    @Field(()=>ID)
    _id: string

    @Field(()=>ID)
    @Prop()
    agencyId: ObjectId

    @Field(()=>ID)
    @Prop()
    payLevelId: ObjectId

    @Field(()=>GraphQLJSON)
    @Prop()
    payTableMeta: any

    @Field(()=>String)
    @Prop()
    createdAt: string

}

@InputType()
export class AgencyPayTableInput{

    @Field(()=>ID, {nullable: true})
    @Prop()
    agencyId: ObjectId

    @Field(()=>ID, {nullable: true})
    @Prop()
    payLevelId: ObjectId

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    payTableMeta: any

}

@ObjectType()
export class AgencyPayTableResponse{

    @Field(()=>GraphQLJSON)
    response: any

    @Field(()=>String)
    message: string

}


export const AgencyPayTableModal = getModelForClass(AgencyPayTable);