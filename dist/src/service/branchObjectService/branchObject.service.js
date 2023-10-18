"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchObjectService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const branchObject_schema_1 = require("../../schema/branchObjectSchema/branchObject.schema");
const properties_service_1 = require("../propertiesService/properties.service");
class BranchObjectService {
    async updateMandatoryObject(propertyId, isReadOnly) {
        try {
            const isExist = await branchObject_schema_1.branchObjectModal.findOne({ propertyId: propertyId });
            if (isExist) {
                await branchObject_schema_1.branchObjectModal.updateOne({ propertyId }, { isReadOnly });
            }
            else {
                if (isReadOnly == true) {
                    this.generateMandatoryObject(propertyId, true);
                }
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async generateMandatoryObject(propertyId, isReadOnly) {
        try {
            const isExist = await branchObject_schema_1.branchObjectModal.findOne({ propertyId: propertyId });
            if (isExist) {
                await branchObject_schema_1.branchObjectModal.updateOne({ propertyId }, { isReadOnly });
            }
            else {
                // do it to update use in prop
                const property = new properties_service_1.PropertiesService();
                const propertyDetail = await property.getPropertyById(propertyId);
                const useIn = Number(propertyDetail === null || propertyDetail === void 0 ? void 0 : propertyDetail.useIn) + 1;
                await (property === null || property === void 0 ? void 0 : property.updatePropertyInUse(propertyId, useIn));
                await branchObject_schema_1.branchObjectModal.create({
                    propertyId,
                    isMandatory: 1,
                    isReadOnly: isReadOnly ? isReadOnly : false,
                    date: (0, dayjs_1.default)(),
                });
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async updateBranchObjectOrder({ fields }) {
        try {
            await Promise.all(fields === null || fields === void 0 ? void 0 : fields.map(async (field, index) => {
                return await branchObject_schema_1.branchObjectModal.updateOne({ propertyId: field === null || field === void 0 ? void 0 : field.propertyId }, { $set: { order: index } });
            }));
            return {
                response: {
                    success: 1,
                    message: "row updated"
                }
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async createBranchObject({ fields }) {
        try {
            await Promise.all(fields === null || fields === void 0 ? void 0 : fields.map(async (schema) => {
                var _a;
                const isExist = await branchObject_schema_1.branchObjectModal.findOne({ propertyId: schema === null || schema === void 0 ? void 0 : schema.propertyId });
                if (isExist && ((_a = Object.keys(isExist)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    return await branchObject_schema_1.branchObjectModal.updateOne({ propertyId: schema === null || schema === void 0 ? void 0 : schema.propertyId }, {
                        $set: { isMandatory: schema === null || schema === void 0 ? void 0 : schema.isMandatory },
                    });
                }
                else {
                    // do it to update use in prop
                    const property = new properties_service_1.PropertiesService();
                    const propertyDetail = await property.getPropertyById(schema === null || schema === void 0 ? void 0 : schema.propertyId);
                    const useIn = Number(propertyDetail === null || propertyDetail === void 0 ? void 0 : propertyDetail.useIn) + 1;
                    await (property === null || property === void 0 ? void 0 : property.updatePropertyInUse(schema === null || schema === void 0 ? void 0 : schema.propertyId, useIn));
                    return await branchObject_schema_1.branchObjectModal.create({
                        ...schema,
                        isReadOnly: 0,
                        date: (0, dayjs_1.default)(),
                    });
                }
            }));
            return {
                response: {
                    success: 1,
                    message: "Properties added successfully",
                }
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async branchObject() {
        try {
            const branchObjectData = await branchObject_schema_1.branchObjectModal.aggregate([
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
                        order: 1,
                        "propertyDetail.label": 1,
                        "propertyDetail.rules": 1,
                        "propertyDetail.fieldType": 1,
                        "propertyDetail.options": 1,
                        "propertyDetail.isArchive": 1,
                    }
                }
            ]);
            const branchObject = (branchObjectData === null || branchObjectData === void 0 ? void 0 : branchObjectData.filter((branch) => { var _a; return ((_a = branch === null || branch === void 0 ? void 0 : branch.propertyDetail) === null || _a === void 0 ? void 0 : _a.isArchive) != true; }));
            return {
                response: branchObject
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async deleteBranchObject({ properties }) {
        try {
            await branchObject_schema_1.branchObjectModal.deleteMany({ propertyId: { $in: properties } });
            const property = new properties_service_1.PropertiesService();
            Promise.all(properties === null || properties === void 0 ? void 0 : properties.map(async (prop) => {
                const propertyDetail = await property.getPropertyById(prop);
                const useIn = Number(propertyDetail === null || propertyDetail === void 0 ? void 0 : propertyDetail.useIn) - 1;
                return await (property === null || property === void 0 ? void 0 : property.updatePropertyInUse(prop, useIn));
            }));
            return {
                response: properties
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async getSinglePropFromBranchObjectSchema(id) {
        try {
            const { isMandatory } = await branchObject_schema_1.branchObjectModal.findById(id);
            return isMandatory;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}
exports.BranchObjectService = BranchObjectService;
;
