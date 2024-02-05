import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Search{
    @Field(()=>ID)
    _id: string

    @Field(()=>String)
    @Prop()
    searchQuery: string

    @Field(()=>GraphQLJSON)
    @Prop()
    filters: any

    @Field(()=>ID)
    @Prop()
    searchBy: string

    @Field(()=>String)
    @Prop({default: dayjs().format("DD/MM/YYY HH:mm:ss")})
    madeAt: string

}

@InputType()
export class SearchInput {
    @Field(()=>String)
    searchQuery: string

    @Field(()=>GraphQLJSON, {nullable: true})
    filters: any
}

@ObjectType()
export class SearchResult{
    @Field(()=>GraphQLJSON)
    response: any

    @Field(()=>String)
    message: string
}


export const SearchModal = getModelForClass(Search)