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
exports.BranchModal = exports.BranchFilter = exports.createBranchInput = exports.BranchGenericResponse = exports.Branches = exports.Branch = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
let Branch = class Branch {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Branch.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Branch.prototype, "branchname", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Branch.prototype, "postcode", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], Branch.prototype, "metadata", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Branch.prototype, "createdDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Branch.prototype, "updatedDate", void 0);
Branch = __decorate([
    (0, type_graphql_1.ObjectType)()
], Branch);
exports.Branch = Branch;
let Branches = class Branches {
};
__decorate([
    (0, type_graphql_1.Field)(() => [Branch]),
    __metadata("design:type", Array)
], Branches.prototype, "branches", void 0);
Branches = __decorate([
    (0, type_graphql_1.ObjectType)()
], Branches);
exports.Branches = Branches;
let BranchGenericResponse = class BranchGenericResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BranchGenericResponse.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BranchGenericResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", Object)
], BranchGenericResponse.prototype, "response", void 0);
BranchGenericResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], BranchGenericResponse);
exports.BranchGenericResponse = BranchGenericResponse;
let createBranchInput = class createBranchInput {
};
__decorate([
    (0, class_validator_1.MinLength)(2, {
        message: "Please enter meaningfull branch name",
    }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], createBranchInput.prototype, "branchname", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], createBranchInput.prototype, "postcode", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], createBranchInput.prototype, "metadata", void 0);
createBranchInput = __decorate([
    (0, type_graphql_1.InputType)()
], createBranchInput);
exports.createBranchInput = createBranchInput;
let BranchFilter = class BranchFilter {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], BranchFilter.prototype, "filters", void 0);
BranchFilter = __decorate([
    (0, type_graphql_1.InputType)()
], BranchFilter);
exports.BranchFilter = BranchFilter;
exports.BranchModal = (0, typegoose_1.getModelForClass)(Branch);
