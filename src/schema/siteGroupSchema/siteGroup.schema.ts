import { Field, ID, InputType, ObjectType } from "type-graphql";
import GraphQLJSON from 'graphql-type-json';
import { Prop, getModelForClass, index, prop } from "@typegoose/typegoose";
import { MinLength } from "class-validator";
import { Date, ObjectId } from "mongoose";

@ObjectType()
export class SiteGroup{
    @Field(()=>ID)
    _id: string;

    @Field(()=>String)
    @prop()
    sitegroupname:string;

    // @Field(()=>String)
    // @prop()
    // customerId:ObjectId;

    // @Field(()=>ID)
    // @prop()
    // branchId:ObjectId;

    @Field(()=>GraphQLJSON,{nullable:true})
    @prop()
    metadata:any;

    @Field(()=>String,{nullable:true})
    @Prop()
    createdDate: string

    @Field(()=>String,{nullable:true})
    @Prop()
    updatedDate: string

}

@ObjectType()
export class SiteGroups{
    @Field(()=>[SiteGroup])
    siteGroups:SiteGroup[]
}

@ObjectType()
export class SiteGroupGenericResponse{
    @Field(()=>Boolean)
    success:Boolean

    @Field(()=>String)
    message:string

    @Field(()=>GraphQLJSON, {nullable: true})
    response: any
}



@InputType()
export class createSiteGroupInput{

    @MinLength(2,{
        message: "Please enter meaningfull site name",
    })
    @Field(()=>String)
    sitegroupname:String

    @Field(()=>GraphQLJSON,{nullable:true})
    metadata:any
}


@InputType()
export class SiteGroupFilter{
    @Field(()=>GraphQLJSON, {nullable:true})
    filters: any
}

@InputType()
export class SiteGroupUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>String)
    _id: string
}


@InputType()
export class BulkSiteGroupUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>GraphQLJSON)
    _ids: any
}


export const SiteGroupModal = getModelForClass(SiteGroup);