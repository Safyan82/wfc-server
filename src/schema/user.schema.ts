import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import {Field, ObjectType, InputType} from "type-graphql";
import {IsEmail, MinLength, MaxLength} from 'class-validator';
import bcrypt from 'bcrypt';
import GraphQLJSON from "graphql-type-json";


// pre save hook to bcrypt the password
// @pre<User>("save", async function(){
//     if(!this.isModified()){
//         return;
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hashSync(this.password, salt);
//     // this.password = "9093434";
//     console.log(this.password)
// })


@InputType()
export class CreateUserInput{
    @Field(()=>String)
    name?:string

    @IsEmail()
    @Field(()=>String)
    email?:string

    @MinLength(6,{
        message: "Password must be at least 6 character long",
    })
    @MaxLength(50,{
        message: "Password must not be longer 50 character long",
    })
    @Field(()=>String)
    password?:string
}

@ObjectType()
export class User{
    @Field(() =>String)
    _id: string;

    @Field(()=> String)
    @prop({required:false})
    email?: string;

    @Field(()=> String)
    @prop({required:false})
    name?: string;

    @Field(()=>String)
    @prop({required: false})
    password?: string;

    @Field(()=>GraphQLJSON,{nullable:true})
    @prop({required:false})
    kafkaMessage?:any;
}





export const UserModal = getModelForClass(User)