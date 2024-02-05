import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { SearchService } from "../../service/searchService/search.service";
import { SearchInput, SearchResult } from "../../schema/searchSchema/search.schema";
import { Context } from "../../utils/context";

@Resolver()
export class SearchResolver{
    constructor(private searchService: SearchService){
        this.searchService = new SearchService();
    }

    @Authorized()
    @Mutation(()=>SearchResult)
    QueryResult(@Ctx() ctx:Context, @Arg('input') input: SearchInput){
        return this.searchService.QueryResult(ctx, input);
    }
};