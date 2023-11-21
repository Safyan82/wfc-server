import dayjs from "dayjs"
import { employeeModal } from "../../schema/employeeSchema/employee.schema"

export class EmployeeService {
    async addEmployee(input){
        try{
            const employee = await employeeModal.create({...input, createdAt: dayjs()});
            return{
                message: "Employee added successfully",
                response: input
            }
        }
        catch(err){
            return {
                message: err.message,
                response: null,
            }
        }
    }

    async getEmployee(input){
        try{

            const {filters} = input;

            const matchStage = {
                $match: {
                    $and: [
                        
                    ]
                }
            };


            matchStage.$match.$and.push({
                firstname:{
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
                            if(propName=="firstname" || propName==="lastname" || propName==="branchid"){
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
                            if(propName=="firstname" || propName==="lastname" || propName==="branchid"){

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
                            if(propName=="firstname" || propName==="lastname" || propName==="branchid"){
                                matchStage.$match.$and.push({[propName]: {$exists: true}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: true}});
                            }
                        }
                        if(filterDetail.filter==="is_unknown"){
                            
                            if(propName=="firstname" || propName==="lastname" || propName==="branchid"){
                                matchStage.$match.$and.push({[propName]: {$exists: false}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: false}});
                            }
                        
                        }
                        // date is equal will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_equal"){
                            
                            if(propName=="firstname" || propName==="lastname" || propName==="branchid"){
                                matchStage.$match.$and.push({[propName]: filterDetail?.filterValue });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: filterDetail?.filterValue });
                            }

                        }

                        // date is before will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_before"){
                            
                            if(propName=="firstname" || propName==="lastname" || propName==="branchid"){
                                matchStage.$match.$and.push({[propName]: {$lt: filterDetail?.filterValue} });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$lt: filterDetail?.filterValue} });
                            }

                        }

                        // date is after will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_after"){
                            
                            if(propName=="firstname" || propName==="lastname" || propName==="branchid"){
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

            
            const employee = await employeeModal.aggregate([
                matchStage,
                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      firstname: 1,
                      lastname: 1,
                      branchid: 1,
                      metadata: 1,
                      createdDate: 1,
                    }
                }
            ]);
            return {
                response: employee,
                success: 1,
                message: "Employee reterived successfully",
            };
        }
        catch(err){
            throw new Error(err);
        }
    }
}