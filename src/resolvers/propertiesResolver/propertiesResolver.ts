import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PropertiesService } from "../../service/propertiesService/properties.service";
import { ArchivePropertyInput, GenericPropertyResponse, Properties, PropertiesInput } from "../../schema/propertiesSchema/properties.schema";

@Resolver()
export class PropertiesResolver{
    
    constructor(private propertiesService: PropertiesService){
        this.propertiesService = new PropertiesService()
    }

    @Mutation(()=>GenericPropertyResponse)
    createProperty(@Arg('input', {validate: true}) input: PropertiesInput){
        return this.propertiesService.createProperties(input);
    }

    @Mutation(()=>GenericPropertyResponse)
    updateProperty(@Arg('input', {validate: true}) input: PropertiesInput){
        return this.propertiesService.updateProperties(input);
    }

    @Query(()=>[Properties])
    propertyList(){
        return this.propertiesService.propertyList();
    }


    @Mutation(()=>GenericPropertyResponse)
    archiveProperty(@Arg('input',{validate:true}) input: ArchivePropertyInput){
        return this.propertiesService.archiveProperty(input);
    }

    @Mutation(()=>GenericPropertyResponse)
    unarchiveProperty(@Arg('input',{validate:true}) input: ArchivePropertyInput){
        return this.propertiesService.unarchiveProperty(input);
    }

    
    @Mutation(()=>GenericPropertyResponse)
    deleteProperty(@Arg('input',{validate:true}) input: ArchivePropertyInput){
        return this.propertiesService.deleteProperty(input);
    }


    @Query(()=>[Properties])
    getArchiveProperties(){
        return this.propertiesService.archivePropertyList();
    }

    @Query(()=>Properties)
    getPropertyById(@Arg('id') id:string){
        return this.propertiesService.getPropertyById(id);
    }

    @Query(()=>[Properties])
    getPropertyByGroupId(@Arg('groupId') groupId:string){
        return this.propertiesService.getPropertyByGroupId(groupId)
    }
}