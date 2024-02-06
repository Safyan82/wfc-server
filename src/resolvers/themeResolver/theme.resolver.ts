import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ThemeService } from "../../service/themeService/theme.service";
import { Theme, ThemeInput, ThemeModal } from "../../schema/themeSchema/theme.schema";

@Resolver()
export class ThemeResolver{
    constructor(private themeService: ThemeService){
        this.themeService = new ThemeService();
    }

    @Mutation(()=>Theme)
    newTheme(@Arg('input') input:ThemeInput){
        return this.themeService.newTheme(input)
    }

    @Query(()=>Theme)
    getThemeByUserId(@Arg('userId') userId:String){
        return this.themeService.getThemeByUserId(userId);
    }
}