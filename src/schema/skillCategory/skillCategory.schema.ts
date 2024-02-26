import { Prop, getModelForClass } from "@typegoose/typegoose";
import dayjs from "dayjs";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";
// skill category

@ObjectType()
export class SkillCategory{

    @Field(()=>ID, {nullable: true})
    _id: ObjectId

    @Field(()=>String, {nullable: true})
    @Prop()
    category: string

    @Field(()=>ID, {nullable: true})
    @Prop()
    createdBy: ObjectId

    @Field(()=>String, {nullable: true})
    @Prop({default: dayjs().format("DD/MM/YYYY HH:mm")})
    createdAt: string

    @Field(()=>ID, {nullable: true})
    @Prop()
    updatedBy: ObjectId

    
    @Field(()=>String, {nullable: true})
    @Prop()
    updatedAt: string

}

@ObjectType()
export class SkillCategoryResponse extends SkillCategory{
    @Field(()=>GraphQLJSON)
    createdByDetail: any
}

@ObjectType()
export class SkillCategoryGenericResponse{
    @Field(()=>String)
    message:string
}
@InputType()
export class SkillCategoryInput{
    
    @Field(()=>String,{nullable: true})
    _id: string

    @Field(()=>String)
    @Prop()
    category: string

    
}



@InputType()
class CategoryIds {
    @Field(()=>String)
    ids:string
}

@InputType()
export class CategoryBulkDeleteInput{
    @Field(()=>GraphQLJSON)
    id:[CategoryIds]
}

export const SkillCategoryModal = getModelForClass(SkillCategory);