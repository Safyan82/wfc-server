import { prop, getModelForClass, pre, Prop } from "@typegoose/typegoose";
import {Field, ObjectType, InputType, ID} from "type-graphql";
import {IsEmail, MinLength, MaxLength} from 'class-validator';
import bcrypt from 'bcrypt';
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";

@InputType()
export class userInput{

    @Field(()=>ID, {nullable: true})
    _id:string

    @Field(()=>ID, {nullable: true})
    employeeId:string

    @MinLength(8,{
        message: "Password must be at least 8 character long",
    })
    @MaxLength(10000,{
        message: "Password must not be longer 50 character long",
    })
    @Field(()=>String,{nullable: true})
    password?:string
    
    @Field(()=> String,{nullable: true})
    @prop()
    email: string;

    
    @Field(()=> Number, {nullable: true})
    isManualPassword: number;

    @Field(()=>String, {nullable: true})
    @prop()
    userAccessType: string;

    @Field(()=>ID, {nullable: true})
    @prop({required: false})
    userRole?: ObjectId;

    @Field(()=>GraphQLJSON,{nullable:true})
    @prop({required: false})
    permission?:any;

    
    
    @Field(()=>GraphQLJSON,{nullable:true})
    @Prop({required: false})
    platform?:any;

    
    @Field(()=>GraphQLJSON, {nullable: true})
    @prop({required: false})
    ip?: any;
}

@ObjectType()
export class User{

    @Field(() =>ID)
    _id: string;

    @Field(()=> ID)
    @prop()
    employeeId: ObjectId;

    @Field(()=> String,{nullable: true})
    @prop()
    isManualPassword: string;

    
    @Field(()=> Boolean,{nullable: true})
    @prop()
    isInviteExpired: boolean;

    @Field(()=> String,{nullable: true})
    @prop()
    email: string;

    @Field(()=>String, {nullable: true})
    @prop()
    password?: string;

    @Field(()=>String)
    @prop()
    userAccessType: string;

    @Field(()=>ID, {nullable: true})
    @prop()
    userRole?: ObjectId;

    @Field(()=>GraphQLJSON,{nullable: true})
    @prop()
    permission?:any;

    
    @Field(()=>String, {nullable: true})
    @prop()
    lastActive?: string;

    
    @Field(()=>String, {nullable: true})
    @prop()
    createdAt?: string;

    
    @Field(()=>String, {nullable: true})
    @prop()
    updatedAt?: string;
    
    @Field(()=>GraphQLJSON, {nullable: true})
    @prop()
    ip?: any;

}

@InputType()
export class updateipInput{
    @Field(()=>GraphQLJSON)
    fieldset: any

    @Field(()=>String)
    employeeId: string
}

@ObjectType()
export class UserReponse{
    
    @Field(()=>Boolean, {nullable: true})
    @Prop()
    success: boolean
    
    @Field(()=>String, {nullable: true})
    @Prop()
    message: string

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    response: any



}


@ObjectType()
export class IsLoginResponse{
    @Field(()=>Boolean)
    isLogin: boolean
}

export const UserModal = getModelForClass(User)