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
exports.BranchViewModal = exports.BranchViewDefaultResponse = exports.BranchViewInput = exports.BranchView = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const type_graphql_1 = require("type-graphql");
let BranchView = class BranchView {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BranchView.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], BranchView.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], BranchView.prototype, "visibility", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Object)
], BranchView.prototype, "quickFilter", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Object)
], BranchView.prototype, "advanceFilter", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], BranchView.prototype, "isStandard", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], BranchView.prototype, "isManual", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Object)
], BranchView.prototype, "viewFields", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], BranchView.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], BranchView.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], BranchView.prototype, "updatedBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], BranchView.prototype, "updatedAt", void 0);
BranchView = __decorate([
    (0, type_graphql_1.ObjectType)()
], BranchView);
exports.BranchView = BranchView;
let BranchViewInput = class BranchViewInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BranchViewInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BranchViewInput.prototype, "visibility", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], BranchViewInput.prototype, "quickFilter", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], BranchViewInput.prototype, "advanceFilter", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], BranchViewInput.prototype, "viewFields", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], BranchViewInput.prototype, "isStandard", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], BranchViewInput.prototype, "isManual", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BranchViewInput.prototype, "_id", void 0);
BranchViewInput = __decorate([
    (0, type_graphql_1.InputType)()
], BranchViewInput);
exports.BranchViewInput = BranchViewInput;
let BranchViewDefaultResponse = class BranchViewDefaultResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BranchViewDefaultResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BranchViewDefaultResponse.prototype, "success", void 0);
BranchViewDefaultResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], BranchViewDefaultResponse);
exports.BranchViewDefaultResponse = BranchViewDefaultResponse;
exports.BranchViewModal = (0, typegoose_1.getModelForClass)(BranchView);
