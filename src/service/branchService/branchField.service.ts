import { BranchFieldModal } from "../../schema/branchSchema/branchField.schema";

export default class BranchFieldService {
    async getBranchField(){
        return await BranchFieldModal.find();
    }
    async createBranchField(input){
        return await BranchFieldModal.create(input)
    }
}