import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class UserRole{
    @Field(()=>String)
    _id: string

    @Field(()=>String)
    @Prop()
    rolename: string

    @Field(()=>GraphQLJSON)
    @Prop()
    permission: any

    @Field(()=>String, {nullable: true})
    @Prop()
    createdAt: string

    @Field(()=>String, {nullable: true})
    @Prop()
    updatedAt: string
}

@InputType()
export class userRoleInput{
    

    @Field(()=> String)
    rolename: string

    @Field(()=>GraphQLJSON)
    permission: any


}

@ObjectType()
export class userRoleResponse{
    @Field(()=>GraphQLJSON, {nullable: true})
    response: any
    @Field(()=>String, {nullable: true})
    message: string
    @Field(()=>Boolean, {nullable: true})
    success: boolean
}

export const userRoleModal = getModelForClass(UserRole);