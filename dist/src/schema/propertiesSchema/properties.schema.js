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
exports.PropertiesModal = exports.MoveGroupInput = exports.BulkPropertiesDelete = exports.BulkPropertiesArchive = exports.PropertiesInput = exports.ArchivePropertyInput = exports.PropertyWithFilterInput = exports.GenericProperty = exports.GenericPropertyResponse = exports.Properties = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const type_graphql_1 = require("type-graphql");
let Properties = class Properties {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "key", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Properties.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "objectType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "groupId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "groupName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "label", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "fieldType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Object)
], Properties.prototype, "rules", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Number)
], Properties.prototype, "useIn", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "updatedBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Properties.prototype, "isArchive", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Properties.prototype, "archiveTime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Properties.prototype, "isDelete", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Object)
], Properties.prototype, "options", void 0);
Properties = __decorate([
    (0, type_graphql_1.ObjectType)()
], Properties);
exports.Properties = Properties;
let GenericPropertyResponse = class GenericPropertyResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], GenericPropertyResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], GenericPropertyResponse.prototype, "success", void 0);
GenericPropertyResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GenericPropertyResponse);
exports.GenericPropertyResponse = GenericPropertyResponse;
let GenericProperty = class GenericProperty {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Object)
], GenericProperty.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], GenericProperty.prototype, "success", void 0);
GenericProperty = __decorate([
    (0, type_graphql_1.ObjectType)()
], GenericProperty);
exports.GenericProperty = GenericProperty;
let PropertyWithFilterInput = class PropertyWithFilterInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", Object)
], PropertyWithFilterInput.prototype, "fields", void 0);
PropertyWithFilterInput = __decorate([
    (0, type_graphql_1.InputType)()
], PropertyWithFilterInput);
exports.PropertyWithFilterInput = PropertyWithFilterInput;
let ArchivePropertyInput = class ArchivePropertyInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ArchivePropertyInput.prototype, "id", void 0);
ArchivePropertyInput = __decorate([
    (0, type_graphql_1.InputType)()
], ArchivePropertyInput);
exports.ArchivePropertyInput = ArchivePropertyInput;
let PropertiesInput = class PropertiesInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PropertiesInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PropertiesInput.prototype, "objectType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Object)
], PropertiesInput.prototype, "groupId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PropertiesInput.prototype, "groupName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PropertiesInput.prototype, "label", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PropertiesInput.prototype, "fieldType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PropertiesInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], PropertiesInput.prototype, "rules", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], PropertiesInput.prototype, "options", void 0);
PropertiesInput = __decorate([
    (0, type_graphql_1.InputType)()
], PropertiesInput);
exports.PropertiesInput = PropertiesInput;
let BulkPropertiesArchive = class BulkPropertiesArchive {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", String)
], BulkPropertiesArchive.prototype, "ids", void 0);
BulkPropertiesArchive = __decorate([
    (0, type_graphql_1.InputType)()
], BulkPropertiesArchive);
exports.BulkPropertiesArchive = BulkPropertiesArchive;
let BulkPropertiesDelete = class BulkPropertiesDelete {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", String)
], BulkPropertiesDelete.prototype, "properties", void 0);
BulkPropertiesDelete = __decorate([
    (0, type_graphql_1.InputType)()
], BulkPropertiesDelete);
exports.BulkPropertiesDelete = BulkPropertiesDelete;
let MoveGroupInput = class MoveGroupInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", String)
], MoveGroupInput.prototype, "properties", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MoveGroupInput.prototype, "groupId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MoveGroupInput.prototype, "groupName", void 0);
MoveGroupInput = __decorate([
    (0, type_graphql_1.InputType)()
], MoveGroupInput);
exports.MoveGroupInput = MoveGroupInput;
exports.PropertiesModal = (0, typegoose_1.getModelForClass)(Properties);
