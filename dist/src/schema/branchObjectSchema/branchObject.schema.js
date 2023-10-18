"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericBranchObjectTypeResponse = exports.branchObjectModal = exports.BulkBranchObjectInput = exports.DeleteBranchObjectInput = exports.branchObjectInput = exports.BranchObject = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const type_graphql_1 = require("type-graphql");
let BranchObject = class BranchObject {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], BranchObject.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Object)
], BranchObject.prototype, "propertyId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], BranchObject.prototype, "isMandatory", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], BranchObject.prototype, "isReadOnly", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], BranchObject.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Number)
], BranchObject.prototype, "order", void 0);
BranchObject = __decorate([
    (0, type_graphql_1.ObjectType)()
], BranchObject);
exports.BranchObject = BranchObject;
let branchObjectInput = class branchObjectInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Object)
], branchObjectInput.prototype, "propertyId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], branchObjectInput.prototype, "isMandatory", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], branchObjectInput.prototype, "order", void 0);
branchObjectInput = __decorate([
    (0, type_graphql_1.InputType)()
], branchObjectInput);
exports.branchObjectInput = branchObjectInput;
let Ids = class Ids {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Object)
], Ids.prototype, "id", void 0);
Ids = __decorate([
    (0, type_graphql_1.InputType)()
], Ids);
let DeleteBranchObjectInput = class DeleteBranchObjectInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", Array)
], DeleteBranchObjectInput.prototype, "properties", void 0);
DeleteBranchObjectInput = __decorate([
    (0, type_graphql_1.InputType)()
], DeleteBranchObjectInput);
exports.DeleteBranchObjectInput = DeleteBranchObjectInput;
let BulkBranchObjectInput = class BulkBranchObjectInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => [branchObjectInput]),
    __metadata("design:type", Array)
], BulkBranchObjectInput.prototype, "fields", void 0);
BulkBranchObjectInput = __decorate([
    (0, type_graphql_1.InputType)()
], BulkBranchObjectInput);
exports.BulkBranchObjectInput = BulkBranchObjectInput;
exports.branchObjectModal = (0, typegoose_1.getModelForClass)(BranchObject);
let GenericBranchObjectTypeResponse = class GenericBranchObjectTypeResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", Object)
], GenericBranchObjectTypeResponse.prototype, "response", void 0);
GenericBranchObjectTypeResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GenericBranchObjectTypeResponse);
exports.GenericBranchObjectTypeResponse = GenericBranchObjectTypeResponse;
