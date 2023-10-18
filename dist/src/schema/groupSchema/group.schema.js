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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModal = exports.GroupInput = exports.createGroupResponse = exports.Group = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
let Group = class Group {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "key", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { defaultValue: 0 }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Number)
], Group.prototype, "properties", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "updatedBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { defaultValue: 0 }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Group.prototype, "isDeleted", void 0);
Group = __decorate([
    (0, type_graphql_1.ObjectType)()
], Group);
exports.Group = Group;
// return response of create group
let createGroupResponse = class createGroupResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], createGroupResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], createGroupResponse.prototype, "success", void 0);
createGroupResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], createGroupResponse);
exports.createGroupResponse = createGroupResponse;
let GroupInput = class GroupInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], GroupInput.prototype, "groupId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], GroupInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], GroupInput.prototype, "createdBy", void 0);
GroupInput = __decorate([
    (0, type_graphql_1.InputType)()
], GroupInput);
exports.GroupInput = GroupInput;
exports.GroupModal = (0, typegoose_1.getModelForClass)(Group);
