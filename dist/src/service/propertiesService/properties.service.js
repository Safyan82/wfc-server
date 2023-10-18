"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const properties_schema_1 = require("../../schema/propertiesSchema/properties.schema");
const group_service_1 = require("../groupService/group.service");
const group_schema_1 = require("../../schema/groupSchema/group.schema");
const branchObject_service_1 = require("../branchObjectService/branchObject.service");
class PropertiesService {
    async createProperties(input) {
        var _a, _b;
        try {
            const groupService = new group_service_1.GroupService();
            const branchObjectService = new branchObject_service_1.BranchObjectService();
            const generatedPropert = await properties_schema_1.PropertiesModal.create({ ...input,
                isDelete: 0,
                isArchive: 0, useIn: 0, createdAt: (0, dayjs_1.default)() });
            await groupService.updateNumberOfProperties(input.groupId);
            if ((_a = input === null || input === void 0 ? void 0 : input.rules) === null || _a === void 0 ? void 0 : _a.ownedby) {
                await branchObjectService.generateMandatoryObject(generatedPropert === null || generatedPropert === void 0 ? void 0 : generatedPropert._id, (_b = input === null || input === void 0 ? void 0 : input.rules) === null || _b === void 0 ? void 0 : _b.ownedby);
            }
            return {
                message: "Property added successfully",
                success: 1,
            };
        }
        catch (err) {
            return {
                message: "An Error encountered while adding property",
                success: 0,
            };
        }
    }
    async getPropertiesByGroup() {
        const groups = await properties_schema_1.PropertiesModal.aggregate([
            {
                $match: {
                    $and: [
                        { isArchive: { $eq: false } },
                        { isDelete: { $eq: false } },
                    ]
                }
            },
            {
                $group: {
                    _id: "$groupName",
                    properties: { $push: "$$ROOT" }
                }
            },
        ]);
        // const data = groups?.map((group) => {
        //     const prop = group.properties?.filter((property)=>(property.rules.propertyVisibility));
        //     return{
        //         ...group,
        //         properties: [...prop]
        //     }
        // });
        return {
            success: true,
            data: groups,
        };
    }
    async updatePropertiesByGroupId(groupId, groupName) {
        try {
            await properties_schema_1.PropertiesModal.updateMany({ groupId }, { groupName });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async updateProperties(input) {
        var _a;
        try {
            // const groupService = new GroupService();
            await properties_schema_1.PropertiesModal.updateOne({ _id: input.id }, { ...input,
                updatedAt: (0, dayjs_1.default)() });
            // await groupService.updateNumberOfProperties(input.groupId);
            // if(input?.rules?.ownedby){
            const branchObjectService = new branchObject_service_1.BranchObjectService();
            branchObjectService.updateMandatoryObject(input.id, (_a = input === null || input === void 0 ? void 0 : input.rules) === null || _a === void 0 ? void 0 : _a.ownedby);
            // }
            return {
                message: "Property updated successfully",
                success: 1,
            };
        }
        catch (err) {
            return {
                message: "An Error encountered while adding property",
                success: 0,
            };
        }
    }
    async propertyList() {
        const properties = await properties_schema_1.PropertiesModal
            .aggregate([
            {
                $match: {
                    $and: [
                        { isArchive: { $eq: false } },
                        { isDelete: { $eq: false } },
                    ]
                }
            },
            {
                $project: {
                    key: "$_id",
                    _id: 1,
                    // Include other fields if needed
                    objectType: 1,
                    groupId: 1,
                    label: 1,
                    fieldType: 1,
                    rules: 1,
                    useIn: 1,
                    description: 1,
                    createdAt: 1,
                    createdBy: 1,
                    updatedAt: 1,
                    updatedBy: 1,
                    groupName: 1,
                    options: 1,
                }
            },
            // {
            //     $lookup: {
            //         from: "groups",
            //         localField: "_id",
            //         foreignField: "groupId",
            //         as: "group"
            //     }
            // }
        ]);
        console.log(properties);
        return properties;
    }
    async archiveProperty(input) {
        try {
            const { id: _id, } = input;
            await properties_schema_1.PropertiesModal.updateOne({ _id }, { isArchive: true, archiveTime: (0, dayjs_1.default)() });
            return {
                message: 'Property archived successfully',
                success: 1,
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async unarchiveProperty(input) {
        try {
            const { id: _id, } = input;
            await properties_schema_1.PropertiesModal.updateOne({ _id }, { isArchive: false, archiveTime: (0, dayjs_1.default)() });
            return {
                message: 'Property archived successfully',
                success: 1,
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async deleteProperty(input) {
        try {
            const { id: _id, } = input;
            const { groupId } = await this.getPropertyById(_id);
            const groupService = new group_service_1.GroupService();
            const branchObjectService = new branchObject_service_1.BranchObjectService();
            await groupService.updateNumberOfArchivePropertiesOnDelete(groupId);
            await properties_schema_1.PropertiesModal.updateOne({ _id }, { isDelete: true, });
            await branchObjectService.deleteBranchObject({ properties: [_id] });
            return {
                message: 'Property archived successfully',
                success: 1,
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async archivePropertyList() {
        try {
            const properties = await properties_schema_1.PropertiesModal
                .aggregate([
                {
                    $match: {
                        $and: [
                            { isArchive: { $eq: true } },
                            { isDelete: { $eq: false } },
                        ]
                    }
                },
                {
                    $project: {
                        key: "$_id",
                        _id: 1,
                        // Include other fields if needed
                        objectType: 1,
                        groupId: 1,
                        label: 1,
                        fieldType: 1,
                        rules: 1,
                        useIn: 1,
                        description: 1,
                        createdAt: 1,
                        createdBy: 1,
                        updatedAt: 1,
                        updatedBy: 1,
                        groupName: 1,
                        isArchive: 1,
                        archiveTime: 1,
                    },
                },
            ]);
            return properties;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async archivePropertyFilter(startDate, endDate) {
        try {
            const properties = await properties_schema_1.PropertiesModal
                .aggregate([
                {
                    $match: {
                        $and: [
                            { isArchive: { $eq: true } },
                            { isDelete: { $eq: false } },
                            { archiveTime: {
                                    $gte: startDate.toString(),
                                    $lte: endDate.toString()
                                } }
                        ]
                    }
                },
                {
                    $project: {
                        key: "$_id",
                        _id: 1,
                        // Include other fields if needed
                        objectType: 1,
                        groupId: 1,
                        label: 1,
                        fieldType: 1,
                        rules: 1,
                        useIn: 1,
                        description: 1,
                        createdAt: 1,
                        createdBy: 1,
                        updatedAt: 1,
                        updatedBy: 1,
                        groupName: 1,
                        isArchive: 1,
                        archiveTime: 1,
                    },
                },
            ]);
            console.log(properties);
            return properties;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async getPropertyById(_id) {
        return await properties_schema_1.PropertiesModal.findById(_id);
    }
    async getPropertyByGroupId(groupId) {
        return await properties_schema_1.PropertiesModal
            .aggregate([
            {
                $match: {
                    $and: [
                        { isArchive: { $eq: false } },
                        { isDelete: { $eq: false } },
                        { groupId: { $eq: groupId } },
                    ]
                }
            },
            {
                $project: {
                    key: "$_id",
                    _id: 1,
                    // Include other fields if needed
                    objectType: 1,
                    groupId: 1,
                    label: 1,
                    fieldType: 1,
                    rules: 1,
                    useIn: 1,
                    description: 1,
                    createdAt: 1,
                    createdBy: 1,
                    updatedAt: 1,
                    updatedBy: 1,
                    groupName: 1,
                    options: 1,
                }
            },
        ]);
    }
    async updatePropertiesGroup(newGroupId, prevGroupId, newGroupName) {
        try {
            const properties = await this.getPropertyByGroupId(prevGroupId);
            const propIds = (properties).map((property) => property._id);
            for (let i = 0; i < propIds.length; i++) {
                await properties_schema_1.PropertiesModal.updateOne({ _id: propIds[i] }, {
                    groupId: newGroupId,
                    groupName: newGroupName
                });
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async bulkDeleteProperties({ properties }) {
        try {
            const propertyIds = properties.map((property) => property.key);
            const groupIds = properties.map((property) => property.groupId);
            const groupService = new group_service_1.GroupService();
            const branchObjectService = new branchObject_service_1.BranchObjectService();
            await branchObjectService.deleteBranchObject({ properties: propertyIds });
            for (let i = 0; i < propertyIds.length; i++) {
                await groupService.updateNumberOfArchivePropertiesOnDelete(groupIds[i]);
                await properties_schema_1.PropertiesModal.updateOne({ _id: propertyIds[i] }, { $set: { isDelete: true } });
            }
            return { success: 1, message: "Properties are deleted successfully" };
        }
        catch (err) {
            return false;
        }
    }
    async getPropertywithFilters({ fields }) {
        var _a;
        const matchStage = {
            $match: {
                $and: []
            }
        };
        if (fields && ((_a = Object.keys(fields)) === null || _a === void 0 ? void 0 : _a.length)) {
            fields === null || fields === void 0 ? void 0 : fields.map((fld) => {
                if (fld.value) {
                    matchStage.$match.$and.push({ [fld.field]: fld.value });
                }
            });
            matchStage.$match.$and.push({ isArchive: false });
            matchStage.$match.$and.push({ isDelete: false });
        }
        else {
            matchStage.$match.$and.push({ isArchive: false });
            matchStage.$match.$and.push({ isDelete: false });
        }
        return await properties_schema_1.PropertiesModal
            .aggregate([
            matchStage,
            {
                $project: {
                    key: "$_id",
                    _id: 1,
                    // Include other fields if needed
                    objectType: 1,
                    groupId: 1,
                    label: 1,
                    fieldType: 1,
                    rules: 1,
                    useIn: 1,
                    description: 1,
                    createdAt: 1,
                    createdBy: 1,
                    updatedAt: 1,
                    updatedBy: 1,
                    groupName: 1,
                    options: 1,
                }
            },
        ]);
    }
    async moveGroup({ properties, groupId, groupName }) {
        const _ids = properties.map((property) => property.key);
        const groupIds = properties.map((property) => property.groupId);
        // await PropertiesModal.updateMany(
        //     { _ids },
        //     {  groupId, groupName  }
        // );
        const groupService = new group_service_1.GroupService();
        // update the prev group by removing property from them
        for (let i = 0; i < properties.length; i++) {
            await properties_schema_1.PropertiesModal.updateOne({ _id: _ids[i] }, { groupId, groupName });
            const group = await group_schema_1.GroupModal.findOne({ _id: properties[i].groupId });
            // Subtract 1 from the numberOfProperties field
            const updatedNumberOfProperties = group.properties - 1;
            // Update the document with the new value
            await group_schema_1.GroupModal.updateOne({ _id: group._id }, { $set: { properties: updatedNumberOfProperties } });
        }
        // update number of properties in which the properties are being moving
        await groupService.bulkUpdateNumberOfProperties(groupId, properties.length);
        return {
            success: 1,
            message: JSON.stringify(groupIds),
        };
    }
    async archiveBulkProperties({ ids }) {
        try {
            await properties_schema_1.PropertiesModal.updateMany({ _id: { $in: ids } }, { $set: { isArchive: 1 } });
            return { success: 1, message: 'properties archived successfully' };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async unarchiveBulkProperties({ ids }) {
        try {
            await properties_schema_1.PropertiesModal.updateMany({ _id: { $in: ids } }, { $set: { isArchive: 0 } });
            return { success: 1, message: 'properties unArchived successfully' };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async updatePropertyInUse(propertyId, useIn) {
        try {
            await properties_schema_1.PropertiesModal.updateOne({ _id: propertyId }, { $set: { useIn } });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}
exports.PropertiesService = PropertiesService;
