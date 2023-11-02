import dayjs from "dayjs";
import { BranchModal, createBranchInput } from "../../schema/branchSchema/branch.schema";

export default class BranchService{
    async createBranch(input: createBranchInput){
        try{
            const createdDate = dayjs().format('YYYY-MM-DD');
            const branch =  await BranchModal.create({...input, createdDate});
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

    async branches(input){
        try{

            const {filters} = input;

            const matchStage = {
                $match: {
                    $and: [
                        
                    ]
                }
            };


            matchStage.$match.$and.push({
                branchname:{
                    $ne: null,
                }
            })

            if(filters?.quickFilter){
                Object.values(filters?.quickFilter)?.forEach((value, i)=>{
                    if(value!=null){
                        matchStage.$match.$and.push({[Object.keys(filters?.quickFilter)[i]] : value})
                    }
                });
            };

            if(filters?.advanceFilter){
                filters?.advanceFilter?.map((filter)=>{
                    filter?.map((filterDetail)=>{
                        
                        const propName = filterDetail?.operator?.replaceAll(" ","").toLowerCase();
                        
                        if(filterDetail.filter==="contain_exactly"){
                            if(propName=="branchname" || propName==="postcode"){
                                const orCondition = filterDetail?.filterValue.map((value)=>{
                                    return {
                                        [propName] : {$regex: value.toLowerCase(), $options: "i"},
                                    }
                                });
    
                                matchStage.$match.$and.push(
                                    {
                                        $or: orCondition
                                    }
                                );
                            }else{
                                const orCondition = filterDetail?.filterValue.map((value)=>{
                                    return {
                                        [`metadata.${propName}`] : {$regex: value.toLowerCase(), $options: "i"},
                                    }
                                });
    
                                matchStage.$match.$and.push(
                                    {
                                        $or: orCondition
                                    }
                                );
                            }
                        }

                        if(filterDetail.filter==="not_contain"){
                            if(propName=="branchname" || propName==="postcode"){

                                const orCondition = filterDetail?.filterValue.map((value)=>{
                                    return {
                                        [propName] : { $not : {$regex: value.toLowerCase(), $options: "i"}},
                                    }
                                });
                                matchStage.$match.$and.push(
                                    {
                                        $or: orCondition
                                    }
                                );
                            }else{

                                const orCondition = filterDetail?.filterValue.map((value)=>{
                                    return {
                                        [`metadata.${propName}`] : { $not : {$regex: value.toLowerCase(), $options: "i"}},
                                    }
                                });
                                matchStage.$match.$and.push(
                                    {
                                        $or: orCondition
                                    }
                                );

                            }
                        }
                        if(filterDetail.filter==="is_known"){
                            if(propName=="branchname" || propName==="postcode"){
                                matchStage.$match.$and.push({[propName]: {$exists: true}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: true}});
                            }
                        }
                        if(filterDetail.filter==="is_unknown"){
                            
                            if(propName=="branchname" || propName==="postcode"){
                                matchStage.$match.$and.push({[propName]: {$exists: false}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: false}});
                            }
                        
                        }
                        // date is equal will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_equal"){
                            
                            if(propName=="branchname" || propName==="postcode"){
                                matchStage.$match.$and.push({[propName]: filterDetail?.filterValue });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: filterDetail?.filterValue });
                            }

                        }

                        // date is before will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_before"){
                            
                            if(propName=="branchname" || propName==="postcode"){
                                matchStage.$match.$and.push({[propName]: {$lt: filterDetail?.filterValue} });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$lt: filterDetail?.filterValue} });
                            }

                        }

                        // date is after will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_after"){
                            
                            if(propName=="branchname" || propName==="postcode"){
                                matchStage.$match.$and.push({[propName]: {$gt: filterDetail?.filterValue} });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$gt: filterDetail?.filterValue} });
                            }

                        }

                        // date is more than will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_more_than"){
                            
                            const newDate = dayjs().add(Number(filterDetail?.filterValue), 'day').format('YYYY-MM-DD');
                            if(filterDetail?.filterValue1==='days ago'){
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$gt: newDate} });
                            }

                        }

                        // date is between than will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_between"){
                            
                            matchStage.$match.$and.push({[`metadata.${propName}`]: {$gte: filterDetail?.filterValue, $lte: filterDetail?.filterValue1} });
                            

                        }

                    });
                });
            };

            console.log(matchStage.$match.$and)
            
            const branch = await BranchModal.aggregate([
                matchStage,
                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      branchname: 1,
                      postcode: 1,
                      metadata: 1,
                      createdDate: 1,
                    }
                }
            ]);
            return branch;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateBranch(input){
        try{
            const {_id, ...rest} = input;
            
            let data = {$set:{}}
            rest?.properties?.map((prop)=>{
                if(prop.metadata){
                   data.$set[`metadata.${prop.name}`]=prop.value;
                }else{
                    data.$set[prop.name] = prop.value;
                }
            });
            await BranchModal.updateOne({_id}, data);
            return {
                success: 1,
                message: "Branch updated successfully",
                response: data,
            }
        }
        catch(err){
            return{
                success: 0,
                message: err.message,
            }
        }
    }

    async branch(_id){
        try{
            return await BranchModal.findById(_id);
        }
        catch(err){
            throw new Error(err);
        }
    }
}   