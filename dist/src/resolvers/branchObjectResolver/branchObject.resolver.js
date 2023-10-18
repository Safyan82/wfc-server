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
exports.BranchObjectResolver = void 0;
const type_graphql_1 = require("type-graphql");
const branchObject_service_1 = require("../../service/branchObjectService/branchObject.service");
const branchObject_schema_1 = require("../../schema/branchObjectSchema/branchObject.schema");
let BranchObjectResolver = class BranchObjectResolver {
    constructor(branchObjectService) {
        this.branchObjectService = branchObjectService;
        this.branchObjectService = new branchObject_service_1.BranchObjectService();
    }
    getBranchProperty() {
        return this.branchObjectService.branchObject();
    }
    createBranchObject(input) {
        return this.branchObjectService.createBranchObject(input);
    }
    updateBranchObjectOrder(input) {
        return this.branchObjectService.updateBranchObjectOrder(input);
    }
    deleteBranchObject(input) {
        return this.branchObjectService.deleteBranchObject(input);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => branchObject_schema_1.GenericBranchObjectTypeResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BranchObjectResolver.prototype, "getBranchProperty", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => branchObject_schema_1.GenericBranchObjectTypeResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branchObject_schema_1.BulkBranchObjectInput]),
    __metadata("design:returntype", void 0)
], BranchObjectResolver.prototype, "createBranchObject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => branchObject_schema_1.GenericBranchObjectTypeResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branchObject_schema_1.BulkBranchObjectInput]),
    __metadata("design:returntype", void 0)
], BranchObjectResolver.prototype, "updateBranchObjectOrder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => branchObject_schema_1.GenericBranchObjectTypeResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branchObject_schema_1.DeleteBranchObjectInput]),
    __metadata("design:returntype", void 0)
], BranchObjectResolver.prototype, "deleteBranchObject", null);
BranchObjectResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [branchObject_service_1.BranchObjectService])
], BranchObjectResolver);
exports.BranchObjectResolver = BranchObjectResolver;
