import { ThemeModal } from "../../schema/themeSchema/theme.schema";

export class ThemeService{
    async newTheme(input){
        const isExist = await this.getThemeByUserId(input?.userId);
        if(isExist){
            const {userId, color} = input;
            return await ThemeModal.updateOne({userId}, {$set:{color}});
        }else{
            return await ThemeModal.create(input);
        }
    }

    async getThemeByUserId(userId){
        return await ThemeModal.findOne({userId});
    }
}