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
const type_graphql_1 = require("type-graphql");
const branchView_schema_1 = require("../../schema/branchView/branchView.schema");
const branchView_service_1 = require("../../service/branchViewService/branchView.service");
let BranchViewResolver = class BranchViewResolver {
    constructor(branchViewService) {
        this.branchViewService = branchViewService;
        this.branchViewService = new branchView_service_1.BranchViewService();
    }
    async createBranchView(input) {
        return this.branchViewService.createBranchView(input);
    }
    ;
    async updateBranchView(input) {
        return this.branchViewService.updateBranchView(input);
    }
    async branchViews() {
        return this.branchViewService.branchView();
    }
    async singlebranchView(_id) {
        return this.branchViewService.singlebranchView(_id);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => branchView_schema_1.BranchViewDefaultResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branchView_schema_1.BranchViewInput]),
    __metadata("design:returntype", Promise)
], BranchViewResolver.prototype, "createBranchView", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => branchView_schema_1.BranchViewDefaultResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branchView_schema_1.BranchViewInput]),
    __metadata("design:returntype", Promise)
], BranchViewResolver.prototype, "updateBranchView", null);
__decorate([
    (0, type_graphql_1.Query)(() => [branchView_schema_1.BranchView]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BranchViewResolver.prototype, "branchViews", null);
__decorate([
    (0, type_graphql_1.Query)(() => branchView_schema_1.BranchView),
    __param(0, (0, type_graphql_1.Arg)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BranchViewResolver.prototype, "singlebranchView", null);
BranchViewResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [branchView_service_1.BranchViewService])
], BranchViewResolver);
exports.default = BranchViewResolver;
