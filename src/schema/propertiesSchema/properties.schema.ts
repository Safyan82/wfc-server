import { Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import GraphQLJSON from "graphql-type-json";
import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Group, GroupModal } from "../groupSchema/group.schema";

@ObjectType()
export class Properties{

    @Field(()=>String,{nullable: true})
    @Prop()
    key?: string

    @Field(()=>ID,{nullable: true})
    _id?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    objectType?: string

    // @Field(()=>Group,{nullable: true})
    // @Prop({ref: GroupModal})
    // groupId?: string
    
    @Field(()=>String,{nullable: true})
    @Prop()
    groupId?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    groupName?: string


    @Field(()=>String,{nullable: true})
    @Prop()
    label?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    description?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    fieldType?: string

    @Field(()=>GraphQLJSON,{nullable: true})
    @Prop()
    rules?: any

    @Field(()=>Number,{nullable: true})
    @Prop()
    useIn?: number

    @Field(()=>String,{nullable: true})
    @Prop()
    createdAt?: string

    @Field(()=>String,{nullable: true})
    @Prop()
    updatedAt?: string

    @Field(()=>ID, {nullable: true})
    @Prop()
    createdBy?: string

    @Field(()=>ID,{nullable: true})
    @Prop()
    updatedBy?: string

    @Field(()=>Boolean,{nullable:true})
    @Prop()
    isArchive?: boolean
    
    @Field(()=>String)
    @Prop()
    archiveTime: string

    
    @Field(()=>Boolean,{nullable: true})
    @Prop()
    isDelete?: boolean

    
    @Field(()=>GraphQLJSON,{nullable:true})
    @Prop()
    options?: any;
    
    // @Field(()=>Group)
    // @Prop({ required: true, ref: () => Group })
    // group: Ref<Group>;

}

@ObjectType()
export class GenericPropertyResponse{
    @Field(()=>String)
    @Prop()
    message: String

    @Field(()=>Boolean)
    @Prop()
    success: boolean
}

@InputType()
export class ArchivePropertyInput{
      
    @Field(()=>String)
    id: string

    // @Field(()=>Boolean)
    // isArchive: boolean
}


@InputType()
export class PropertiesInput{    
    @Field(()=>String,{nullable:true})
    id?: string

    @Field(()=>String)
    objectType: string

    @Field(()=>ID)
    groupId: ObjectId

    @Field(()=>String)
    groupName: string

    @Field(()=>String)
    label: string

    @Field(()=>String)
    fieldType: string

    @Field(()=>String,{nullable: true})
    description?: string;

    @Field(()=>GraphQLJSON,{nullable:true})
    rules?: any;

    @Field(()=>GraphQLJSON,{nullable:true})
    options?: any;

}

export const PropertiesModal = getModelForClass(Properties);