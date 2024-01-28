import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class EmployeeView {
    @Field(()=>String, {nullable: true})
    _id?: string

    @Field(()=>String, {nullable: true})
    @Prop()
    name?: string

    @Field(()=>String, {nullable: true})
    @Prop()
    visibility?: string

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    quickFilter?: any

    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    advanceFilter?: any

    
    @Field(()=>Boolean, {nullable: true})
    @Prop()
    isStandard?: boolean

    @Field(()=>Boolean, {nullable: true})
    @Prop()
    isManual?: boolean
    
    @Field(()=>GraphQLJSON,{nullable: true})
    @Prop()
    viewFields?: any

    @Field(()=>String, {nullable: true})
    @Prop()
    createdBy?: string

    @Field(()=>String, {nullable: true})
    @Prop()
    createdAt?: string

    @Field(()=>String, {nullable: true})
    @Prop()
    updatedBy?: string

    @Field(()=>String, {nullable: true})
    @Prop()
    updatedAt?: string

}

@InputType()
export class EmployeeViewInput{
    
    @Field(()=>String, {nullable: true})
    name?: string

    @Field(()=>String, {nullable: true})
    visibility?: string
    
    @Field(()=>GraphQLJSON,{nullable: true})
    quickFilter?: any

    @Field(()=>GraphQLJSON,{nullable: true})
    advanceFilter?: any

    @Field(()=>GraphQLJSON,{nullable: true})
    viewFields?: any
    
    @Field(()=>Boolean, {nullable: true})
    isStandard?: boolean

    @Field(()=>Boolean, {nullable: true})
    isManual?: boolean

    @Field(()=>String, {nullable: true})
    _id?: string

    
    @Field(()=>String, {nullable: true})
    createdBy?: string


    @Field(()=>String, {nullable: true})
    updatedBy?: string


}


@ObjectType()
export class EmployeeViewDefaultResponse {

    @Field(() => String)
    message: string

    @Field(() => Boolean)
    success: boolean

    @Field(()=>GraphQLJSON, {nullable: true})
    response: any
}



export const EmployeeViewModal = getModelForClass(EmployeeView);