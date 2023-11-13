import { Prop } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Employee{
    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    branchId: string

    @Field(()=>String)
    @Prop()
    firstName: string

    @Field(()=>String)
    @Prop()
    lastName: string

    @Field(()=>GraphQLJSON)
    @Prop()
    metadata: any
}