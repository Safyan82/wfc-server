import { Field, ID, InputType, ObjectType } from "type-graphql";
import GraphQLJSON from 'graphql-type-json';
import { Prop, getModelForClass, index, prop } from "@typegoose/typegoose";
import { MinLength } from "class-validator";
import { Date, ObjectId } from "mongoose";

@ObjectType()
export class Site{
    @Field(()=>String)
    _id: string;

    @Field(()=>String)
    @prop()
    sitename:string;

    @Field(()=>String,{nullable:true})
    @prop()
    postcode:string;

    @Field(()=>ID,{nullable:true})
    @prop()
    sitegroupId:ObjectId;

    @Field(()=>String,{nullable:true})
    @prop()
    contractstartdate:string;

    @Field(()=>GraphQLJSON,{nullable:true})
    @prop()
    metadata:any;

    @Field(()=>String)
    @Prop()
    createdDate: string

    @Field(()=>String)
    @Prop()
    updatedDate: string

}

@ObjectType()
export class SiteResponse extends Site{
    @Field(()=>GraphQLJSON, {nullable: true})
    @Prop()
    sitegroupDetail: any
}

@ObjectType()
export class Sites{
    @Field(()=>[Site])
    sites:Site[]
}

@ObjectType()
export class SiteGenericResponse{
    @Field(()=>Boolean)
    success:Boolean

    @Field(()=>String)
    message:string

    @Field(()=>GraphQLJSON, {nullable: true})
    response: any
}



@InputType()
export class createSiteInput{

    @MinLength(2,{
        message: "Please enter meaningfull site name",
    })
    @Field(()=>String)
    sitename:string

    @Field(()=>String)
    postcode:string

    @Field(()=>String)
    sitegroupId:string

    @Field(()=>String)
    contractstartdate:string

    @Field(()=>GraphQLJSON,{nullable:true})
    metadata:any
}


@InputType()
export class SiteFilter{
    @Field(()=>GraphQLJSON, {nullable:true})
    filters: any
}

@InputType()
export class SiteUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>String)
    _id: string
}


@InputType()
export class BulkSiteUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>GraphQLJSON)
    _ids: any
}


export const SiteModal = getModelForClass(Site);