import { SelectedSearchModal } from "../../schema/selectedSearchSchema/selectedSearch.schema";

export class SelectedSearchService{

    async newSelectedSearch(input){
        try{
            const createdSearch = await SelectedSearchModal.create(input);
            return createdSearch;
        }catch(err){
            console.log(err);
        }
    }

    async getSelectedSearchByUser(userId){
        try{
            return await SelectedSearchModal.find({searchedBy:userId})
        }
        catch(err){
            throw new Error(err);
        }
    }

}