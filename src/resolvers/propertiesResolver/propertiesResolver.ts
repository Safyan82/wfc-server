import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PropertiesService } from "../../service/propertiesService/properties.service";
import { ArchivePropertyInput, BulkPropertiesArchive, BulkPropertiesDelete, GenericProperty, GenericPropertyResponse, MoveGroupInput, Properties, PropertiesInput, PropertyWithFilterInput } from "../../schema/propertiesSchema/properties.schema";

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

    @Query(()=>[Properties])
    getPropertywithFilters(@Arg('input', {nullable:true}) input:PropertyWithFilterInput, ){
        return this.propertiesService.getPropertywithFilters(input);
    }

    @Query(()=>[Properties])
    archivePropertyFilter(@Arg('startDate') startDate:string, @Arg('endDate') endDate:string){
        return this.propertiesService.archivePropertyFilter(startDate, endDate);
    }

    @Mutation(()=> GenericPropertyResponse)
    moveGroup(@Arg('input') input:MoveGroupInput){
        return this.propertiesService.moveGroup(input)
    }

    @Mutation(()=>GenericPropertyResponse)
    bulkPropertiesArchive(@Arg('ids') ids: BulkPropertiesArchive){
        return this.propertiesService.archiveBulkProperties(ids)
    }

    @Mutation(()=>GenericPropertyResponse)
    bulkPropertiesunArchive(@Arg('ids') ids: BulkPropertiesArchive){
        return this.propertiesService.unarchiveBulkProperties(ids)
    }

    @Mutation(()=> GenericPropertyResponse)
    bulkDeleteProperties(@Arg('input') input: BulkPropertiesDelete){
        return this.propertiesService.bulkDeleteProperties(input)
    }

    @Query(()=> GenericProperty)
    getPropertyByGroup(){
        return this.propertiesService.getPropertiesByGroup()
    }
}