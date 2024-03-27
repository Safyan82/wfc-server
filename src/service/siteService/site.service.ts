import dayjs from "dayjs";
import mongoose from "mongoose";
import { SiteModal } from "../../schema/siteSchema/site.schema";
import { SiteObjectService } from "../siteObjectSerivce/siteObject.service";

export default class SiteService{

    async createSite(input){
        try{
            const createdDate = dayjs().format('YYYY-MM-DD');
            const site =  await SiteModal.create({...input, createdDate});
            return {
                success: 1,
                response: site,
                message: "site group was added",
            };
        }
        catch(err){
            throw new Error(err);
        }
    }

    async sites(input, customSite){
        try{

            const {filters} = input;

            const matchStage = {
                $match: {
                    $and: [
                        
                    ]
                }
            };

            if(customSite?.length>0){
                matchStage.$match.$and.push(
                {_id: {
                    $in: customSite
                }}
                );
            }

            matchStage.$match.$and.push({
                sitename:{
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
                            if(propName=="sitename" || propName=="postcode" || propName=="sitegroupId" || propName=="contactstartdate"){
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
                            if(propName=="sitename" || propName=="postcode" || propName=="sitegroupId" || propName=="contactstartdate"){

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
                            if(propName=="sitename" || propName=="postcode" || propName=="sitegroupId" || propName=="contactstartdate"){
                                matchStage.$match.$and.push({[propName]: {$exists: true}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: true}});
                            }
                        }
                        if(filterDetail.filter==="is_unknown"){
                            
                            if(propName=="sitename" || propName=="postcode" || propName=="sitegroupId" || propName=="contactstartdate"){
                                matchStage.$match.$and.push({[propName]: {$exists: false}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: false}});
                            }
                        
                        }
                        // date is equal will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_equal"){
                            
                            if(propName=="sitename" || propName=="postcode" || propName=="sitegroupId" || propName=="contactstartdate"){
                                matchStage.$match.$and.push({[propName]: filterDetail?.filterValue });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: filterDetail?.filterValue });
                            }

                        }

                        // date is before will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_before"){
                            
                            if(propName=="sitename" || propName=="postcode" || propName=="sitegroupId" || propName=="contactstartdate"){
                                matchStage.$match.$and.push({[propName]: {$lt: filterDetail?.filterValue} });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$lt: filterDetail?.filterValue} });
                            }

                        }

                        // date is after will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_after"){
                            
                            if(propName=="sitename" || propName=="postcode" || propName=="sitegroupId" || propName=="contactstartdate"){
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
            
            const Site = await SiteModal.aggregate([
                matchStage,
                {
                    $lookup:{
                        foreignField: '_id',
                        localField:'sitegroupId',
                        from:'sitegroups',
                        as:'sitegroupDetail',
                    }
                },
                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      sitename: 1,
                      postcode: 1,
                      sitegroupId: 1,
                      contractstartdate: 1,
                      metadata: 1,
                      createdDate: 1,
                      sitegroupDetail: 1,
                    }
                }
            ]);
            return Site;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateSite(input, ctx){
        try{
            const {_id, ...rest} = input;
            
            let data = {$set:{}};
            // const branchPropertyHistory = new BranchPropertyHistoryService();

            const {response: SiteData} = await this.Site(_id);
            
            rest?.properties?.map(async(prop)=>{
                if(prop.metadata){
                    data.$set[`metadata.${prop.name}`]=prop.value;
                    // if(Object.keys(SiteData.metadata).includes(prop.name)){
                    //     // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, prop.value, _id, ctx?.user?.employeeId);
                    //     // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, branchData.metadata[prop?.name], _id);
                    // }
                }else{
                    data.$set[prop.name] = prop.value;
                    // if(Object.keys(SiteData).includes(prop.name)){
                    //     // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, prop.value, _id, ctx?.user?.employeeId);
                    //     // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, branchData[prop?.name], _id);
                    // }
                }
            });
            await SiteModal.updateOne({_id}, data);
            return {
                success: 1,
                message: "site Group updated successfully",
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

    async Site(_id){
        try{
            const Site =  await SiteModal.aggregate([
                {
                    $match:{
                        _id
                    }
                },
                {
                    $lookup:{
                        foreignField: '_id',
                        localField:'sitegroupId',
                        from:'sitegroups',
                        as:'sitegroupDetail',
                    }
                },
                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      sitename: 1,
                      postcode: 1,
                      sitegroupId: 1,
                      contractstartdate: 1,
                      metadata: 1,
                      createdDate: 1,
                      sitegroupDetail: 1,
                    }
                }
            ]);

            return {
                response: Site[0],
                success: 1,
                message: "Site has been reterived successfully"
            }
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateBulkSite(input){
        try{
            const {_ids, properties} = input;
            const id = _ids?.map((id)=>(new mongoose.Types.ObjectId(id)));
            const filter = { _id: { $in: id } };
            const updateOperation = {
            $set: { ...properties },
            };
            await SiteModal.updateMany(filter, updateOperation);
            return{
                success: 1,
                message: "SiteData Bulk update"
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }

    async searchSite(ctx, query){
        const SiteResult = await SiteModal.aggregate([{$match:{sitename: {$regex:"^"+query, $options: "i" }}}]);
        if(SiteResult?.length>0){
            const siteObjectService = new SiteObjectService();
            const siteObject = await siteObjectService.siteObject(ctx);
            const columns = siteObject?.response?.map((Site)=> {
                return {
                    title: Site?.propertyDetail?.label,
                    dataIndex: Site?.propertyDetail?.label?.toLowerCase("")?.replace(/\s/g,""),
                }
            });
            
            const data = SiteResult?.map((Site)=>{
                const {metadata, ...rest} = Site;
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