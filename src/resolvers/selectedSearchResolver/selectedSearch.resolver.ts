import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { SelectedSearchService } from "../../service/selectedSearchService/selectedSearch.service";
import { SelectedSearch, SelectedSearchInput } from "../../schema/selectedSearchSchema/selectedSearch.schema";

@Resolver()
export class selectedSearchResolver{
    constructor(private selectedSearchService: SelectedSearchService){
        this.selectedSearchService = new SelectedSearchService();
    }

    @Mutation(()=>SelectedSearch)
    newSelectedSearch(@Arg('input') input:SelectedSearchInput){
        return this.selectedSearchService.newSelectedSearch(input);
    }

    @Query(()=>[SelectedSearch])
    getSelectedSearchByUser(@Arg('userId') userId:string){
        return this.selectedSearchService.getSelectedSearchByUser(userId);
    }
};