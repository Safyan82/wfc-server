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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const user_schema_1 = require("../schema/user.schema");
const user_service_1 = __importDefault(require("../service/user.service"));
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
        this.userService = new user_service_1.default();
        // role base auth
        // role = ctx.roleId
    }
    createUser(input) {
        return this.userService.createUser(input);
    }
    user() {
        return {
            _id: "123",
            name: "Safyan",
            email: "Safyan@gmail.com"
        };
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => user_schema_1.User),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_schema_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "user", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.default])
], UserResolver);
exports.default = UserResolver;
