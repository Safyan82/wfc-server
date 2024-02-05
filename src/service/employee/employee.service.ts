import dayjs from "dayjs"
import { Employee, employeeModal } from "../../schema/employeeSchema/employee.schema"
import mongoose, { mongo } from "mongoose";
import { EmployeePropertyHistoryService } from "../employeePropertyHistoryService/employeePropertyHistory.service";
import { objectTypeList } from "../../utils/objectype";
import { extractPermittedProps } from "../../utils/permissionPower/extractPermittedProps";
import { convertArrayToObject } from "../../utils/convertArrayToObject/convertArrayToObject";
import { UserModal } from "../../schema/userSchema/user.schema";
import { MailService } from "../mailService/mail.service";
import { EmployeeObject } from "../../schema/employeeObjectSchema/employeeObject.Schema";
import { EmployeeObjectService } from "../employeeObjectService/employeeObject.service";
export class EmployeeService {
    async addEmployee(input){
        try{
            const branch = input.branch.map((bran)=> new mongoose.Types.ObjectId(bran))
            const employee = await employeeModal.create({...input,branch, createdAt: dayjs()});
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

    async getEmployee(input, ctx){
        try{
            const customBranch = ctx?.user?.permission?.Branch?.customBranch?.map((branch)=> new mongoose.Types.ObjectId(branch.id));
            const customEmployee = ctx?.user?.permission?.Employee?.customEmployee?.map((emp)=>new mongoose.Types.ObjectId(emp.id));

            const {filters} = input;

            const matchStage = {
                $match: {
                    $and: [
                        
                    ]
                }
            };

            if(customBranch?.length>0){
                matchStage.$match.$and.push(
                {branch: {
                    $in: customBranch
                }}
                );
            }

            
            if(customEmployee?.length>0){
                matchStage.$match.$and.push(
                {_id: {
                    $in: customEmployee
                }}
                );
            }


            matchStage.$match.$and.push({
                firstname:{
                    $ne: null,
                }
            })

            if(filters?.quickFilter){
                Object.values(filters?.quickFilter)?.forEach((value, i)=>{
                    if(value){
                        matchStage.$match.$and.push({[Object.keys(filters?.quickFilter)[i]] : value})
                    }
                });
            };

            if(filters?.advanceFilter){
                filters?.advanceFilter?.map((filter)=>{
                    filter?.map((filterDetail)=>{
                        
                        const propName = filterDetail?.operator?.replace(/\s/g,"").toLowerCase();
                        
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

            if(filters?.branch?.length>0){
                matchStage.$match.$and.push({
                    branch: {
                        $in: filters?.branch?.map((branch)=> new mongoose.Types.ObjectId(branch))
                    }
                })
            }
            
            const employee = await employeeModal.aggregate([
                matchStage,
                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      firstname: 1,
                      lastname: 1,
                      branch: 1,
                      metadata: 1,
                      createdDate: 1,
                    }
                },
                {
                    $lookup: {
                      from: "branches",
                      localField: "branch",
                      foreignField: "_id",
                      as: "branch"
                    }
                },

                // {
                // $unwind: "$branch"
                // },

                
            ]);
          
            // return response if all employee have to use
            if(ctx?.user?.permission?.Employee?.view!=="None"){
                return {
                    response: employee?.map((emp)=> ({...emp, branch: emp.branch.map((branch)=> branch.branchname).join(", "), branches: emp.branch
                    })),
                    success: 1,
                    message: "Employee reterived successfully",
                };
            }
        }
        catch(err){
            throw new Error(err);
        }
    }

    async singleEmployee(_id){
        try{
            const employee = await employeeModal.findOne({_id: new mongoose.Types.ObjectId(_id)});
            return {
                response: employee
            }
        }
        catch(err){
            return {
                message: err.message,
            }
        }
    }

    async updateEmployee(input){
        try{
            const {_id, ...rest} = input;
            const branch = input?.branch?.map((bran)=> new mongoose.Types.ObjectId(bran))
            
            let data = {$set:{updatedAt: dayjs(), branch}};
            const employeePropertyHistory = new EmployeePropertyHistoryService();

            const employeeData = await this.employee(_id);
            
            rest?.properties?.map(async(prop)=>{
                if(prop.metadata){
                    data.$set[`metadata.${prop.name}`]=prop.value;
                    if(Object.keys(employeeData.metadata).includes(prop.name)){
                        await employeePropertyHistory.createPropertyHistoryRecord(prop?.propertyId, employeeData.metadata[prop?.name], _id);
                    }
                }else{
                    if(prop.name=="branch"){
                        console.log(prop.value?.map((propIds)=>new mongoose.Types.ObjectId(propIds?.id)), "proppp")
                        data.$set[prop.name] = prop.value?.map((propIds)=>new mongoose.Types.ObjectId(propIds?.id));
                        if(Object.keys(employeeData).includes(prop.name)){
                            await employeePropertyHistory.createPropertyHistoryRecord(prop?.propertyId, employeeData[prop?.name], _id);
                        }
                    }else{
                        data.$set[prop.name] = prop.value;
                        if(Object.keys(employeeData).includes(prop.name)){
                            await employeePropertyHistory.createPropertyHistoryRecord(prop?.propertyId, employeeData[prop?.name], _id);
                        }
                    }
                }
            });

            await employeeModal.updateOne({_id}, data);
            return {
                success: 1,
                message: "employee updated successfully",
                response: data,
            }
        }
        catch(err){
            return{
                success: 0,
                response: {error: err.message},
                message: err.message,
            }
        }
    }

    
    async employee(_id){
        try{
            const employee =  await employeeModal.findById(_id);
            return {
                firstname: employee?.firstname,
                lastname: employee?.lastname,
                branch: employee?.branch,
                metadata: employee?.metadata,
            }
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateBulkEmployee(input){
        try{
            const {_ids, properties} = input;
            const id = _ids?.map((id)=>(new mongoose.Types.ObjectId(id)));
            const filter = { _id: { $in: id } };
            const updateOperation = {
            $set: { ...properties },
            };
            await employeeModal.updateMany(filter, updateOperation);
            return{
                success: 1,
                message: "Bulk update"
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }

    async checkUserByEmail(email){
        try{
            const user = await UserModal.findOne({'email': email});
            
            return {
                response : {_id: user?.employeeId, email}
            }
        }
        catch(err){
            return {
                response: null,
                message: err.message
            }
        }
    }

    async searchEmployee(ctx, query){
        const employeeResult = await employeeModal.aggregate([
            {
                $match:{
                    $or:[
                        {firstname: {$regex:"^"+query, $options: "i" }},
                        {lastname: {$regex:"^"+query, $options: "i" }},
                        {email: {$regex:"^"+query, $options: "i" }},
                        {'metadata.email': {$regex:"^"+query, $options: "i" }},
                    ]
                }
            },
            {
                $lookup: {
                    from: "branches",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branch"
                }
            },
        ]);

        if(employeeResult?.length>0){
            
            const employeeObjectService = new EmployeeObjectService(); 
            const employeeObject = await employeeObjectService.employeeObject(ctx);
            const columns = employeeObject?.response?.map((emp)=> {
                return {
                    title: emp?.propertyDetail?.label,
                    dataIndex: emp?.propertyDetail?.label?.toLowerCase("")?.replace(/\s/g,""),
                }
            });
            const data = employeeResult?.map((emp)=>{
                const {metadata, ...rest} = emp;
                const metadataExtracted = metadata && Object.keys(metadata)?.map((prop)=>{
                    return{
                        [prop]: metadata[prop]
                    }
                });
                if(metadataExtracted?.length>0){

                    return {
                        ...rest,
                        branch: emp?.branch?.map((branch)=>branch?.branchname).join(" "),
                        ...(metadataExtracted[0]),
                    }
                }else{
                    
                    return {
                        ...rest,
                        branch: emp?.branch?.map((branch)=>branch?.branchname).join(" ")
                    }
                }
            });

            return {
                columns:[...columns,{title:'Created At', dataIndex:'createdAt'}], data
            }
        }else{
            return
        }
    }
}