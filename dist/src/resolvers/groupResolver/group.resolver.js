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
exports.GroupResolver = void 0;
const type_graphql_1 = require("type-graphql");
const group_schema_1 = require("../../schema/groupSchema/group.schema");
const group_service_1 = require("../../service/groupService/group.service");
let GroupResolver = class GroupResolver {
    constructor(groupService) {
        this.groupService = groupService;
        this.groupService = new group_service_1.GroupService();
    }
    createGroup(input) {
        return this.groupService.createGroup(input);
    }
    updateGroup(input) {
        return this.groupService.updateGroup(input);
    }
    deleteGroup(id, groupIdToMoveIn) {
        return this.groupService.deleteGroup(id, groupIdToMoveIn);
    }
    groupList() {
        return this.groupService.groupList();
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => group_schema_1.createGroupResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_schema_1.GroupInput]),
    __metadata("design:returntype", void 0)
], GroupResolver.prototype, "createGroup", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => group_schema_1.createGroupResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_schema_1.GroupInput]),
    __metadata("design:returntype", void 0)
], GroupResolver.prototype, "updateGroup", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => group_schema_1.createGroupResponse),
    __param(0, (0, type_graphql_1.Arg)('id', { validate: true })),
    __param(1, (0, type_graphql_1.Arg)('groupIdToMoveIn', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GroupResolver.prototype, "deleteGroup", null);
__decorate([
    (0, type_graphql_1.Query)(() => [group_schema_1.Group]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroupResolver.prototype, "groupList", null);
GroupResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupResolver);
exports.GroupResolver = GroupResolver;
