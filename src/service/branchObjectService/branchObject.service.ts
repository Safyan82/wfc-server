import dayjs from "dayjs";
import { branchObjectModal } from "../../schema/branchObjectSchema/branchObject.schema";

export class BranchObjectService{
    async generateMandatoryObject(propertyId, isReadOnly){
        try{
            await branchObjectModal.create({
                propertyId,
                isMandatory: 1,
                isReadOnly: isReadOnly? isReadOnly: false,
                date: dayjs(),
            });
        }catch(err){
            throw new Error(err.message);
        }
    }

    async createBranchObject({fields}){
        try{
            await Promise.all(fields?.map(async(schema)=>{
                const isExist  = await branchObjectModal.findOne({propertyId: schema?.propertyId});
                if(isExist && Object.keys(isExist)?.length>0){

                    return await branchObjectModal.updateOne({propertyId: schema?.propertyId},{
                        $set:{isMandatory: schema?.isMandatory},
                    });

                }else{

                    return await branchObjectModal.create({
                        ...schema,
                        isReadOnly: 0,
                        date: dayjs(),
                    });
                }
            }));

            return {
                response:{
                    success: 1,
                    message: "Properties added successfully",
                }
            };

        }catch(err){
            throw new Error(err.message);
        }
    }

    async branchObject(){
        try{
            const branchObject = await branchObjectModal.aggregate([
                {
                  $lookup: {
                    from: "properties",
                    localField: "propertyId",
                    foreignField: "_id",
                    as: "propertyDetail"
                  }
                },
                {
                  $unwind: "$propertyDetail"
                },
                {
                  $project: {
                    _id: 1,
                    propertyId: 1,
                    isReadOnly: 1,
                    isMandatory: 1,
                    "propertyDetail.label": 1,
                    "propertyDetail.rules": 1,
                    "propertyDetail.fieldType": 1,
                  }
                }
            ]);
            return {
                response: branchObject
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async deleteBranchObject({properties}){
        try{

            await branchObjectModal.deleteMany({propertyId: { $in: properties}});

            return {
                 response: properties
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
};