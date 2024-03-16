import dayjs from "dayjs";
import mongoose from "mongoose";
import { customerModal } from "../../schema/customerSchema/customer.schema";
import { CustomerObjectService } from "../customerObjectService/customerObject.service";

export default class CustomerService{

    async createCustomer(input, createdBy){
        try{
            const createdDate = dayjs().format('YYYY-MM-DD HH:mm');
            const customer =  await customerModal.create({...input, createdAt: createdDate, createdBy});
            return {
                success: 1,
                response: customer,
                message: "customer was added",
            };
        }
        catch(err){
            throw new Error(err);
        }
    }

    async customers(input, customCustomer){
        try{

            const {filters} = input;

            const matchStage = {
                $match: {
                    $and: [
                        
                    ]
                }
            };

            if(customCustomer?.length>0){
                matchStage.$match.$and.push(
                {_id: {
                    $in: customCustomer
                }}
                );
            }

            matchStage.$match.$and.push({
                customername:{
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
                            if(propName=="customername"){
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
                            if(propName=="customername"){

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
                            if(propName=="customername"){
                                matchStage.$match.$and.push({[propName]: {$exists: true}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: true}});
                            }
                        }
                        if(filterDetail.filter==="is_unknown"){
                            
                            if(propName=="customername"){
                                matchStage.$match.$and.push({[propName]: {$exists: false}});
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$exists: false}});
                            }
                        
                        }
                        // date is equal will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_equal"){
                            
                            if(propName=="customername"){
                                matchStage.$match.$and.push({[propName]: filterDetail?.filterValue });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: filterDetail?.filterValue });
                            }

                        }

                        // date is before will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_before"){
                            
                            if(propName=="customername"){
                                matchStage.$match.$and.push({[propName]: {$lt: filterDetail?.filterValue} });
                            }else{
                                matchStage.$match.$and.push({[`metadata.${propName}`]: {$lt: filterDetail?.filterValue} });
                            }

                        }

                        // date is after will both for part of object schema and metadata as well
                        if(filterDetail.filter=="is_after"){
                            
                            if(propName=="customername"){
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
            
            const customer = await customerModal.aggregate([
                matchStage,
                {
                    $project: {
                      key: "$_id",
                      _id: 1,
                      // Include other fields if needed
                      customername: 1,
                      metadata: 1,
                      createdDate: 1,
                    }
                }
            ]);

            console.log("customer", customer);
            return customer;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateCustomer(input, ctx){
        try{
            const {_id, ...rest} = input;
            
            let data = {$set:{}};
            // const branchPropertyHistory = new BranchPropertyHistoryService();

            const customerData = await this.customer(_id);
            
            rest?.properties?.map(async(prop)=>{
                if(prop.metadata){
                    data.$set[`metadata.${prop.name}`]=prop.value;
                    if(Object.keys(customerData.metadata).includes(prop.name)){
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, prop.value, _id, ctx?.user?.employeeId);
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, branchData.metadata[prop?.name], _id);
                    }
                }else{
                    data.$set[prop.name] = prop.value;
                    if(Object.keys(customerData).includes(prop.name)){
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, prop.value, _id, ctx?.user?.employeeId);
                        // await branchPropertyHistory.createBranchPropertyHistoryRecord(prop?.propertyId, branchData[prop?.name], _id);
                    }
                }
            });
            await customerModal.updateOne({_id}, data);
            return {
                success: 1,
                message: "Customer updated successfully",
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

    async customer(_id){
        try{
            const customer =  await customerModal.findById(_id);
            return {
                _id: customer?._id,
                customername: customer?.customername,
                metadata: customer?.metadata,
                ...customer
            }
        }
        catch(err){
            throw new Error(err);
        }
    }

    async updateBulkCustomer(input){
        try{
            const {_ids, properties} = input;
            const id = _ids?.map((id)=>(new mongoose.Types.ObjectId(id)));
            const filter = { _id: { $in: id } };
            const updateOperation = {
            $set: { ...properties },
            };
            await customerModal.updateMany(filter, updateOperation);
            return{
                success: 1,
                message: "customer Bulk update"
            }
        }
        catch(err){
            return {
                success: 0,
                message: err.message
            }
        }
    }

    async searchCustomer(ctx, query){
        const customerResult = await customerModal.aggregate([{$match:{customername: {$regex:"^"+query, $options: "i" }}}]);
        if(customerResult?.length>0){
            const customerObjectService = new CustomerObjectService();
            const customerObject = await customerObjectService.customerObject(ctx);
            const columns = customerObject?.response?.map((customer)=> {
                return {
                    title: customer?.propertyDetail?.label,
                    dataIndex: customer?.propertyDetail?.label?.toLowerCase("")?.replace(/\s/g,""),
                }
            });
            
            const data = customerResult?.map((customer)=>{
                const {metadata, ...rest} = customer;
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