import { Index, Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";


@ObjectType()
export class Agency{
    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    agencyname: string

    @Field(()=>GraphQLJSON ,{nullable: true})
    @Prop()
    metadata: any

    @Field(()=>ID ,{nullable: true})
    @Prop()
    createdBy: ObjectId

    @Field(()=>ID ,{nullable: true})
    @Prop()
    updatedBy: ObjectId

    @Field(()=>String ,{nullable: true})
    @Prop()
    createdAt: string

    @Field(()=>String ,{nullable: true})
    @Prop()
    updatedAt: string
}

@InputType()
export class AgencyInput{

    @Field(()=>String)
    agencyname: string

    @Field(()=>GraphQLJSON, {nullable: true})
    metadata: any
};

@ObjectType()
export class AgencyGenericResponse{

    @Field(()=>String, {nullable: true})
    message: string

    @Field(()=>GraphQLJSON, {nullable: true})
    response: any
};

@InputType()
export class AgencyFilter{
    @Field(()=>GraphQLJSON, {nullable:true})
    filters: any
}

export const AgencyModal = getModelForClass(Agency);

@InputType()
export class AgencyUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>String)
    _id: string
}

@InputType()
export class BulkAgencyUpdateInput{
    @Field(()=>GraphQLJSON)
    properties: any

    @Field(()=>GraphQLJSON)
    _ids: any
}