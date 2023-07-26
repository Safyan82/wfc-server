import { BranchModal, createBranchInput } from "../../schema/branchSchema/branch.schema";

export default class BranchService{
    async createBranch(input: createBranchInput){
        try{
            const branch =  await BranchModal.create(input);
            return {
                success: 1,
                response: branch,
                message: "Branch was added",
            };
        }
        catch(err){
            throw new Error(err);
        }
    }

    async branches(){
        try{
            const branch = await BranchModal.find();
            return branch;
        }
        catch(err){
            throw new Error(err);
        }
    }
}