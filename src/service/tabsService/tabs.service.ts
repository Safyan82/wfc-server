import { TabsModel } from "../../schema/tabsSchema/tabs.schema";

export class TabsService{


    async updateTab(group, tabs){
        tabs?.map(async (tab) => {
            const isTabsExist = await this.getTabsByGroup(group);
            if(isTabsExist){
                const dbTabs = isTabsExist?.map((tb)=> tb.tab.toLowerCase());
                const isTabExistInCurrent = tabs?.filter((tab)=> !dbTabs.includes(tab.toLowerCase()));
                console.log(isTabExistInCurrent, "isTabExistInCurrent");
                if(!isTabExistInCurrent){
                    // delete particular group from that tab
                    // const newGrp = isTabsExist?.groups?.map(()=>)
                }
            }else{
                // add particular group to that tab
            }
        })
    }

    async getTabsByGroup(group){
        const tabDetail = await TabsModel.find({
            "groups": {
                "$elemMatch": {
                    "name": group
                }
            }
        });
        if(tabDetail){
            return tabDetail
        }else{
            return [];
        }
    }

}