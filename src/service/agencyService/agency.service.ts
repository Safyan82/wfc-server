import dayjs from "dayjs";
import mongoose from "mongoose";
import { customerModal } from "../../schema/customerSchema/customer.schema";
import { CustomerObjectService } from "../customerObjectService/customerObject.service";
import { AgencyModal } from "../../schema/agencySchema/agency.schema";
import { AgencyObjectService } from "../agencyObjectService/agencyObject.service";

export default class AgencyService{

    async createAgency(input, createdBy){
        try{
            const createdDate = dayjs().format('YYYY-MM-DD HH:mm');
            const agency =  await AgencyModal.create({...input, createdAt: createdDate, createdBy});
            return {
                success: 1,
                response: agency,
                message: "agency was added",
            };
        }
        catch(err){
            throw new Error(err);
        }
    }

    async agencies(input, customAgency){
        try{

            const {filters} = input;

            const matchStage = {
                $match: {
                    $and: [
                        
                    ]
                }
            };

            if(customAgency?.length>0){
                matchStage.$match.$and.push(
                {_id: {
                    $in: customAgency
                }}
                );
            }

            matchStage.$match.$and.push({
                agencyname:{
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
                        
                        const propName = filterDetail?.operator?.replace(/\s/g,"").toLowerCase();
                       
                        if(filterDetail.filter==="contain_exactly"){
                            if(propName=="agencyname"){
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
                            if(propName=="agencyname"){

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
                            if(propName=="agencyname"){
                                matchStage.$match.$and.push({[propName]: {$exists: true}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: true}});
                            }
                        }
                        if(filterDetail.filter==="is_unknown"){
                            
                            if(propName=="agencyname"){
                                matchStage.$match.$and.push({[propName]: {$exists: false}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: false}});
                            }
                        
                        }
                        // date is equal will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_equal"){
                            
                            if(propName=="agencyname"){
                                matchStage.$match.$and.push({[propName]: filterDetail?.filterValue });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: filterDetail?.filterValue });
                            }

                        }

                        // date is before will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_before"){
                            
                            if(propName=="agencyname"){
                                matchStage.$match.$and.push({[propName]: {$lt: filterDetail?.filterValue} });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$lt: filterDetail?.filterValue} });
                            }

                        }

                        // date is after will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_after"){
                            
                            if(propName=="agencyname"){
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

            // console.log(matchStage.$match.$and)
            
            const agency = await AgencyModal.aggregate([
                matchStage,
                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      agencyname: 1,
                      metadata: 1,
                      createdDate: 1,
                    }
                }
            ]);

            return agency;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateAgency(input, ctx){
        try{
            const {_id, ...rest} = input;
            
            let data = {$set:{}};
            // const branchPropertyHistory = new BranchPropertyHistoryService();

            const agencyData = await this.agency(_id);
            
            rest?.properties?.map(async(prop)=>{
                if(prop.metadata){
                    data.$set[`metadata.${prop.name}`]=prop.value;
                    if(Object.keys(agencyData.metadata).includes(prop.name)){
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, prop.value, _id, ctx?.user?.employeeId);
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, branchData.metadata[prop?.name], _id);
                    }
                }else{
                    data.$set[prop.name] = prop.value;
                    if(Object.keys(agencyData).includes(prop.name)){
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, prop.value, _id, ctx?.user?.employeeId);
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, branchData[prop?.name], _id);
                    }
                }
            });
            await AgencyModal.updateOne({_id}, data);
            return {
                success: 1,
                message: "agencyData updated successfully",
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

    async agency(_id){
        try{
            const agency =  await AgencyModal.findById(_id);
            return {
                _id: agency?._id,
                agencyname: agency?.agencyname,
                metadata: agency?.metadata,
                ...agency
            }
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateBulkAgency(input){
        try{
            const {_ids, properties} = input;
            const id = _ids?.map((id)=>(new mongoose.Types.ObjectId(id)));
            const filter = { _id: { $in: id } };
            const updateOperation = {
            $set: { ...properties },
            };
            await AgencyModal.updateMany(filter, updateOperation);
            return{
                success: 1,
                message: "agency Bulk update"
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }

    async searchAgency(ctx, query){
        const agencyResult = await AgencyModal.aggregate([{$match:{agencyname: {$regex:"^"+query, $options: "i" }}}]);
        if(agencyResult?.length>0){
            const agencyObjectService = new AgencyObjectService();
            const agencyObject = await agencyObjectService.agencyObject(ctx);
            const columns = agencyObject?.response?.map((agency)=> {
                return {
                    title: agency?.propertyDetail?.label,
                    dataIndex: agency?.propertyDetail?.label?.toLowerCase("")?.replace(/\s/g,""),
                }
            });
            
            const data = agencyResult?.map((agency)=>{
                const {metadata, ...rest} = agency;
                const metadataExtracted = metadata && Object.keys(metadata)?.map((prop)=>{
                    return{
                        [prop]: metadata[prop]
                    }
                });
                if(metadataExtracted?.length>0){

                    return {
                        ...rest,
                        ...metadataExtracted[0],
                    }
                }else{
                    return{
                        ...rest
                    }
                }
            });
            return {columns:[...columns,{title:'Created At', dataIndex:'createdDate'}], data};
        }
        return;
    }

}   