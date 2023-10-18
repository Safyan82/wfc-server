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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesResolver = void 0;
const type_graphql_1 = require("type-graphql");
const properties_service_1 = require("../../service/propertiesService/properties.service");
const properties_schema_1 = require("../../schema/propertiesSchema/properties.schema");
let PropertiesResolver = class PropertiesResolver {
    constructor(propertiesService) {
        this.propertiesService = propertiesService;
        this.propertiesService = new properties_service_1.PropertiesService();
    }
    createProperty(input) {
        return this.propertiesService.createProperties(input);
    }
    updateProperty(input) {
        return this.propertiesService.updateProperties(input);
    }
    propertyList() {
        return this.propertiesService.propertyList();
    }
    archiveProperty(input) {
        return this.propertiesService.archiveProperty(input);
    }
    unarchiveProperty(input) {
        return this.propertiesService.unarchiveProperty(input);
    }
    deleteProperty(input) {
        return this.propertiesService.deleteProperty(input);
    }
    getArchiveProperties() {
        return this.propertiesService.archivePropertyList();
    }
    getPropertyById(id) {
        return this.propertiesService.getPropertyById(id);
    }
    getPropertyByGroupId(groupId) {
        return this.propertiesService.getPropertyByGroupId(groupId);
    }
    getPropertywithFilters(input) {
        return this.propertiesService.getPropertywithFilters(input);
    }
    archivePropertyFilter(startDate, endDate) {
        return this.propertiesService.archivePropertyFilter(startDate, endDate);
    }
    moveGroup(input) {
        return this.propertiesService.moveGroup(input);
    }
    bulkPropertiesArchive(ids) {
        return this.propertiesService.archiveBulkProperties(ids);
    }
    bulkPropertiesunArchive(ids) {
        return this.propertiesService.unarchiveBulkProperties(ids);
    }
    bulkDeleteProperties(input) {
        return this.propertiesService.bulkDeleteProperties(input);
    }
    getPropertyByGroup() {
        return this.propertiesService.getPropertiesByGroup();
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.PropertiesInput]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "createProperty", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.PropertiesInput]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "updateProperty", null);
__decorate([
    (0, type_graphql_1.Query)(() => [properties_schema_1.Properties]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "propertyList", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.ArchivePropertyInput]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "archiveProperty", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.ArchivePropertyInput]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "unarchiveProperty", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.ArchivePropertyInput]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "deleteProperty", null);
__decorate([
    (0, type_graphql_1.Query)(() => [properties_schema_1.Properties]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "getArchiveProperties", null);
__decorate([
    (0, type_graphql_1.Query)(() => properties_schema_1.Properties),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "getPropertyById", null);
__decorate([
    (0, type_graphql_1.Query)(() => [properties_schema_1.Properties]),
    __param(0, (0, type_graphql_1.Arg)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "getPropertyByGroupId", null);
__decorate([
    (0, type_graphql_1.Query)(() => [properties_schema_1.Properties]),
    __param(0, (0, type_graphql_1.Arg)('input', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.PropertyWithFilterInput]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "getPropertywithFilters", null);
__decorate([
    (0, type_graphql_1.Query)(() => [properties_schema_1.Properties]),
    __param(0, (0, type_graphql_1.Arg)('startDate')),
    __param(1, (0, type_graphql_1.Arg)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "archivePropertyFilter", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.MoveGroupInput]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "moveGroup", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.BulkPropertiesArchive]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "bulkPropertiesArchive", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.BulkPropertiesArchive]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "bulkPropertiesunArchive", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => properties_schema_1.GenericPropertyResponse),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [properties_schema_1.BulkPropertiesDelete]),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "bulkDeleteProperties", null);
__decorate([
    (0, type_graphql_1.Query)(() => properties_schema_1.GenericProperty),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertiesResolver.prototype, "getPropertyByGroup", null);
PropertiesResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService])
], PropertiesResolver);
exports.PropertiesResolver = PropertiesResolver;
