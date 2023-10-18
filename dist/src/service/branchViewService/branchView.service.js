"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchViewService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const branchView_schema_1 = require("../../schema/branchView/branchView.schema");
class BranchViewService {
    async createBranchView(input) {
        try {
            await branchView_schema_1.BranchViewModal.create({ ...input, createdDate: (0, dayjs_1.default)().format('YYYY-MM-DD') });
            return {
                message: "Branch view created successfully",
                success: 1,
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    ;
    async updateBranchView(input) {
        try {
            await branchView_schema_1.BranchViewModal.updateOne({ _id: input === null || input === void 0 ? void 0 : input._id }, { ...input, updatedDate: (0, dayjs_1.default)().format('YYYY-MM-DD') });
            return {
                success: 1,
                message: "View updated successfully",
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async branchView() {
        try {
            const branchViewResponse = await branchView_schema_1.BranchViewModal.find();
            console.log(branchViewResponse);
            return branchViewResponse;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    ;
    async singlebranchView(_id) {
        try {
            const singlebranchView = await branchView_schema_1.BranchViewModal.findOne({ _id });
            return singlebranchView;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}
exports.BranchViewService = BranchViewService;
