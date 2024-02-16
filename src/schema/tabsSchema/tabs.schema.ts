import { Prop, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Tabs{

    @Field(()=>ID)
    _id: string


    @Field(()=>String)
    @Prop()
    tab: string

    @Field(()=>GraphQLJSON)
    @Prop()
    groups: any


    @Field(()=>String)
    @Prop()
    module: string
    


}

export const TabsModel = getModelForClass(Tabs);