import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class SelectedSearch{
    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    query: string

    @Field(()=>String)
    @Prop()
    category: string

    @Field(()=>GraphQLJSON)
    @Prop()
    selectedSearchObject: any

    @Field(()=>String)
    @Prop()
    searchedBy: string
}


@InputType()
export class SelectedSearchInput{

    @Field(()=>String)
    @Prop()
    query: string

    @Field(()=>String)
    @Prop()
    category: string

    @Field(()=>GraphQLJSON)
    @Prop()
    selectedSearchObject: any

    @Field(()=>ID)
    @Prop()
    searchedBy: string

    
}


export const SelectedSearchModal = getModelForClass(SelectedSearch)