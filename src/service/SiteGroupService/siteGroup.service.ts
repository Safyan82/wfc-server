import dayjs from "dayjs";
import { BranchPropertyHistoryService } from "../branchPropertyHistoryService/branchPropertyHistory.service";
import mongoose from "mongoose";
import { BranchObjectService } from "../branchObjectService/branchObject.service";
import { SiteGroupModal } from "../../schema/siteGroupSchema/siteGroup.schema";
import { SiteGroupObjectService } from "../siteGroupObjectService/siteGroupObject.service";
export default class SiteGroupService{

    async createSiteGroup(input){
        try{
            const createdDate = dayjs().format('YYYY-MM-DD');
            const {branch, customer, ...rest} = input;
            const sitegroup =  await SiteGroupModal.create({...rest, branch: new mongoose.Types.ObjectId(branch), customer: new mongoose.Types.ObjectId(customer), createdDate});
            return {
                success: 1,
                response: sitegroup,
                message: "site group was added",
            };
        }
        catch(err){
            throw new Error(err);
        }
    }

    async sitegroups(input, customSiteGroup){
        try{

            const {filters} = input;

            const matchStage = {
                $match: {
                    $and: [
                        
                    ]
                }
            };

            // if(customSiteGroup?.length>0){
            //     matchStage.$match.$and.push(
            //     {_id: {
            //         $in: customSiteGroup
            //     }}
            //     );
            // }

            matchStage.$match.$and.push({
                sitegroupname:{
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
                            if(propName=="sitegroupname"){
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
                            if(propName=="sitegroupname"){

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
                            if(propName=="sitegroupname"){
                                matchStage.$match.$and.push({[propName]: {$exists: true}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: true}});
                            }
                        }
                        if(filterDetail.filter==="is_unknown"){
                            
                            if(propName=="sitegroupname"){
                                matchStage.$match.$and.push({[propName]: {$exists: false}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: false}});
                            }
                        
                        }
                        // date is equal will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_equal"){
                            
                            if(propName=="sitegroupname"){
                                matchStage.$match.$and.push({[propName]: filterDetail?.filterValue });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: filterDetail?.filterValue });
                            }

                        }

                        // date is before will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_before"){
                            
                            if(propName=="sitegroupname"){
                                matchStage.$match.$and.push({[propName]: {$lt: filterDetail?.filterValue} });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$lt: filterDetail?.filterValue} });
                            }

                        }

                        // date is after will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_after"){
                            
                            if(propName=="sitegroupname"){
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
            
            const siteGroup = await SiteGroupModal.aggregate([
                matchStage,
                {
                    $lookup:{
                        localField:'customer',
                        foreignField:'_id',
                        from:'customers',
                        as:'customerDetail',
                    }
                },
                {
                    $lookup:{
                        localField:'branch',
                        foreignField:'_id',
                        from:'branches',
                        as:'branchDetail',
                    }
                }
            ]);
            const updatedSiteGroup = siteGroup.map((sitegrp)=>({...sitegrp, branch: sitegrp?.branchDetail[0]?.branchname, customer: sitegrp?.customerDetail[0]?.customername}))
            return updatedSiteGroup;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateSiteGroup(input, ctx){
        try{
            const {_id, ...rest} = input;
            
            let data = {$set:{}};
            // const branchPropertyHistory = new BranchPropertyHistoryService();

            const siteGroupData = await this.siteGroup(new mongoose.Types.ObjectId(_id));
            
            rest?.properties?.map(async(prop)=>{
                if(prop.metadata){
                    data.$set[`metadata.${prop.name}`]=prop.value;
                    if(Object.keys(siteGroupData?.response?.metadata).includes(prop.name)){
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, prop.value, _id, ctx?.user?.employeeId);
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, branchData.metadata[prop?.name], _id);
                    }
                }else{
                    data.$set[prop.name] = prop.value;
                    if(Object.keys(siteGroupData).includes(prop.name)){
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, prop.value, _id, ctx?.user?.employeeId);
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, branchData[prop?.name], _id);
                    }
                }
            });
            console.log(data, "st data", new mongoose.Types.ObjectId(_id))
            await SiteGroupModal.updateOne({_id: new mongoose.Types.ObjectId(_id)}, data);
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

    async siteGroup(_id){
        try{
            const siteGroup =  await SiteGroupModal
            .aggregate([
                {
                    $match:{
                        _id: new mongoose.Types.ObjectId(_id)
                    }
                },
                {
                    $lookup:{
                        localField:'customer',
                        foreignField:'_id',
                        from:'customers',
                        as:'customerDetail',
                    }
                },
                {
                    $lookup:{
                        localField:'branch',
                        foreignField:'_id',
                        from:'branches',
                        as:'branchDetail',
                    }
                }
            ]);
            
            return {
                response:{
                    _id: siteGroup[0]?._id,
                    sitegroupname: siteGroup[0]?.sitegroupname,
                    customer: siteGroup[0]?.customerDetail[0]?.customername,
                    branch: siteGroup[0]?.branchDetail[0]?.branchname,
                    metadata: siteGroup[0]?.metadata,
                    customerId: siteGroup[0]?.customerDetail[0]?._id,
                    branchId: siteGroup[0]?.branchDetail[0]?._id,
                }
            }
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateBulkSiteGroup(input){
        try{
            const {_ids, properties} = input;
            const id = _ids?.map((id)=>(new mongoose.Types.ObjectId(id)));
            const filter = { _id: { $in: id } };
            const updateOperation = {
            $set: { ...properties },
            };
            await SiteGroupModal.updateMany(filter, updateOperation);
            return{
                success: 1,
                message: "siteGroupData Bulk update"
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }

    async searchSiteGroup(ctx, query){
        const siteGroupResult = await SiteGroupModal.aggregate([{$match:{sitegroupname: {$regex:"^"+query, $options: "i" }}}]);
        if(siteGroupResult?.length>0){
            const siteGroupObjectService = new SiteGroupObjectService();
            const siteGroupObject = await siteGroupObjectService.siteGroupObject(ctx);
            const columns = siteGroupObject?.response?.map((siteGroup)=> {
                return {
                    title: siteGroup?.propertyDetail?.label,
                    dataIndex: siteGroup?.propertyDetail?.label?.toLowerCase("")?.replace(/\s/g,""),
                }
            });
            
            const data = siteGroupResult?.map((siteGroup)=>{
                const {metadata, ...rest} = siteGroup;
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