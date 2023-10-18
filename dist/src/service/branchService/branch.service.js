"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const branch_schema_1 = require("../../schema/branchSchema/branch.schema");
class BranchService {
    async createBranch(input) {
        try {
            const createdDate = (0, dayjs_1.default)().format('YYYY-MM-DD');
            const branch = await branch_schema_1.BranchModal.create({ ...input, createdDate });
            return {
                success: 1,
                response: branch,
                message: "Branch was added",
            };
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async branches(input) {
        var _a, _b;
        try {
            const { filters } = input;
            const matchStage = {
                $match: {
                    $and: []
                }
            };
            matchStage.$match.$and.push({
                branchname: {
                    $ne: null,
                }
            });
            if (filters === null || filters === void 0 ? void 0 : filters.quickFilter) {
                (_a = Object.values(filters === null || filters === void 0 ? void 0 : filters.quickFilter)) === null || _a === void 0 ? void 0 : _a.forEach((value, i) => {
                    if (value != null) {
                        matchStage.$match.$and.push({ [Object.keys(filters === null || filters === void 0 ? void 0 : filters.quickFilter)[i]]: value });
                    }
                });
            }
            ;
            if (filters === null || filters === void 0 ? void 0 : filters.advanceFilter) {
                (_b = filters === null || filters === void 0 ? void 0 : filters.advanceFilter) === null || _b === void 0 ? void 0 : _b.map((filter) => {
                    filter === null || filter === void 0 ? void 0 : filter.map((filterDetail) => {
                        var _a;
                        const propName = (_a = filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.operator) === null || _a === void 0 ? void 0 : _a.replaceAll(" ", "").toLowerCase();
                        if (filterDetail.filter === "contain_exactly") {
                            if (propName == "branchname" || propName === "postcode") {
                                const orCondition = filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue.map((value) => {
                                    return {
                                        [propName]: { $regex: value.toLowerCase(), $options: "i" },
                                    };
                                });
                                matchStage.$match.$and.push({
                                    $or: orCondition
                                });
                            }
                            else {
                                const orCondition = filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue.map((value) => {
                                    return {
                                        [`metadata.${propName}`]: { $regex: value.toLowerCase(), $options: "i" },
                                    };
                                });
                                matchStage.$match.$and.push({
                                    $or: orCondition
                                });
                            }
                        }
                        if (filterDetail.filter === "not_contain") {
                            if (propName == "branchname" || propName === "postcode") {
                                const orCondition = filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue.map((value) => {
                                    return {
                                        [propName]: { $not: { $regex: value.toLowerCase(), $options: "i" } },
                                    };
                                });
                                matchStage.$match.$and.push({
                                    $or: orCondition
                                });
                            }
                            else {
                                const orCondition = filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue.map((value) => {
                                    return {
                                        [`metadata.${propName}`]: { $not: { $regex: value.toLowerCase(), $options: "i" } },
                                    };
                                });
                                matchStage.$match.$and.push({
                                    $or: orCondition
                                });
                            }
                        }
                        if (filterDetail.filter === "is_known") {
                            if (propName == "branchname" || propName === "postcode") {
                                matchStage.$match.$and.push({ [propName]: { $exists: true } });
                            }
                            else {
                                matchStage.$match.$and.push({ [`metadata.${propName}`]: { $exists: true } });
                            }
                        }
                        if (filterDetail.filter === "is_unknown") {
                            if (propName == "branchname" || propName === "postcode") {
                                matchStage.$match.$and.push({ [propName]: { $exists: false } });
                            }
                            else {
                                matchStage.$match.$and.push({ [`metadata.${propName}`]: { $exists: false } });
                            }
                        }
                        // date is equal will both for part of object schema and metadata as well
                        if (filterDetail.filter == "is_equal") {
                            if (propName == "branchname" || propName === "postcode") {
                                matchStage.$match.$and.push({ [propName]: filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue });
                            }
                            else {
                                matchStage.$match.$and.push({ [`metadata.${propName}`]: filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue });
                            }
                        }
                        // date is before will both for part of object schema and metadata as well
                        if (filterDetail.filter == "is_before") {
                            if (propName == "branchname" || propName === "postcode") {
                                matchStage.$match.$and.push({ [propName]: { $lt: filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue } });
                            }
                            else {
                                matchStage.$match.$and.push({ [`metadata.${propName}`]: { $lt: filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue } });
                            }
                        }
                        // date is after will both for part of object schema and metadata as well
                        if (filterDetail.filter == "is_after") {
                            if (propName == "branchname" || propName === "postcode") {
                                matchStage.$match.$and.push({ [propName]: { $gt: filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue } });
                            }
                            else {
                                matchStage.$match.$and.push({ [`metadata.${propName}`]: { $gt: filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue } });
                            }
                        }
                        // date is more than will both for part of object schema and metadata as well
                        if (filterDetail.filter == "is_more_than") {
                            const newDate = (0, dayjs_1.default)().add(Number(filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue), 'day').format('YYYY-MM-DD');
                            if ((filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue1) === 'days ago') {
                                matchStage.$match.$and.push({ [`metadata.${propName}`]: { $gt: newDate } });
                            }
                        }
                        // date is between than will both for part of object schema and metadata as well
                        if (filterDetail.filter == "is_between") {
                            matchStage.$match.$and.push({ [`metadata.${propName}`]: { $gte: filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue, $lte: filterDetail === null || filterDetail === void 0 ? void 0 : filterDetail.filterValue1 } });
                        }
                    });
                });
            }
            ;
            console.log(matchStage.$match.$and);
            const branch = await branch_schema_1.BranchModal.aggregate([
                matchStage,
                {
                    $project: {
                        key: "$_id",
                        _id: 1,
                        // Include other fields if needed
                        branchname: 1,
                        postcode: 1,
                        metadata: 1,
                        createdDate: 1,
                    }
                }
            ]);
            return branch;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async branch(_id) {
        try {
            return await branch_schema_1.BranchModal.findById(_id);
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
exports.default = BranchService;
