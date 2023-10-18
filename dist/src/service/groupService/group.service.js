"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const group_schema_1 = require("../../schema/groupSchema/group.schema");
const dayjs_1 = __importDefault(require("dayjs"));
const properties_service_1 = require("../propertiesService/properties.service");
class GroupService {
    async createGroup(input) {
        try {
            const { name } = input;
            const isExist = await group_schema_1.GroupModal.findOne({ name, isDeleted: false });
            if (isExist) {
                throw new Error("Group already exist");
            }
            await group_schema_1.GroupModal.create({ ...input, properties: 0, createdAt: (0, dayjs_1.default)() });
            return {
                message: "Group added",
                success: 1,
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async updateGroup(input) {
        try {
            const { groupId: _id, ...rest } = input;
            const propertyService = new properties_service_1.PropertiesService();
            await propertyService.updatePropertiesByGroupId(_id, rest.name);
            await group_schema_1.GroupModal.updateOne({ _id }, { ...rest, updatedAt: (0, dayjs_1.default)() });
            return {
                message: "Group was updated",
                success: 1,
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async findGroupNameById(_id) {
        try {
            const { name } = await group_schema_1.GroupModal.findById(_id);
            return name;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async deleteGroup(_id, groupIdToMoveIn) {
        try {
            const propertyService = new properties_service_1.PropertiesService();
            const properties = await propertyService.getPropertyByGroupId(_id);
            const newGroupName = await this.findGroupNameById(groupIdToMoveIn);
            await propertyService.updatePropertiesGroup(groupIdToMoveIn, _id, newGroupName);
            const alreadyInUse = await this.findGroupById(groupIdToMoveIn);
            await group_schema_1.GroupModal.updateOne({ _id: groupIdToMoveIn }, { properties: (Number(properties.length) + Number(alreadyInUse)) });
            await group_schema_1.GroupModal.updateOne({ _id }, { isDeleted: 1, properties: 0 });
            return {
                message: "deleted",
                success: 1,
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async groupList() {
        try {
            const group = await group_schema_1.GroupModal.aggregate([
                {
                    $match: {
                        $or: [
                            { isDeleted: { $eq: false } },
                            { isDeleted: { $exists: false } },
                        ]
                    }
                },
                {
                    $project: {
                        key: "$_id",
                        _id: 1,
                        // Include other fields if needed
                        name: 1,
                        properties: 1,
                    }
                }
            ]);
            return group;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async findGroupById(_id) {
        try {
            const { properties } = await group_schema_1.GroupModal.findById(_id);
            return properties;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async updateNumberOfProperties(_id) {
        try {
            const properties = await this.findGroupById(_id);
            const inUse = properties + 1;
            await group_schema_1.GroupModal.updateOne({ _id }, { properties: inUse });
            return true;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async updateNumberOfArchivePropertiesOnDelete(_id) {
        try {
            const properties = await this.findGroupById(_id);
            const inUse = properties - 1;
            await group_schema_1.GroupModal.updateOne({ _id }, { $set: { properties: inUse } });
            return true;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async updateNumberOfPropertiesOnDelete(_id, inUse) {
        try {
            await group_schema_1.GroupModal.findOneAndUpdate({ _id }, { $set: { properties: inUse } }, { returnOriginal: false });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async bulkUpdateNumberOfProperties(_id, propertyNum) {
        try {
            const properties = await this.findGroupById(_id);
            const total = propertyNum + properties;
            await group_schema_1.GroupModal.updateOne({ _id }, { properties: total });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async moveandDeleteProperty() {
    }
}
exports.GroupService = GroupService;
