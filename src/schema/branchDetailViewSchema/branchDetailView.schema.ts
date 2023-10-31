import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class BranchDetailView{
    @Field(()=>ID)
    _id: string

    @Field(()=>GraphQLJSON)
    @Prop()
    properties: any

    @Field(()=>String)
    @Prop()
    createdFor: string

    @Field(()=>String)
    @Prop()
    createdBy: string

    @Field(()=>String)
    @Prop()
    createdAt: string

    @Field(()=>String)
    @Prop()
    updatedAt: string
}

@InputType()
export class BranchDetailViewInput{

    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>String)
    createdFor: string

    @Field(()=>String)
    createdBy: string

    @Field(()=>String, {nullable: true})
    _id: string

}

@ObjectType()
export class BranchDetailViewResponse{
    @Field(()=>String, {nullable: true})
    message: string

    @Field(()=> Boolean)
    success: boolean

    @Field(()=> GraphQLJSON, {nullable: true})
    response: any
}

export const BranchDetailViewModal = getModelForClass(BranchDetailView);