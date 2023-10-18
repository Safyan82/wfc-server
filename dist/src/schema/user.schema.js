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
exports.UserModal = exports.User = exports.CreateUserInput = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
// pre save hook to bcrypt the password
// @pre<User>("save", async function(){
//     if(!this.isModified()){
//         return;
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hashSync(this.password, salt);
//     // this.password = "9093434";
//     console.log(this.password)
// })
let CreateUserInput = class CreateUserInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, {
        message: "Password must be at least 6 character long",
    }),
    (0, class_validator_1.MaxLength)(50, {
        message: "Password must not be longer 50 character long",
    }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
CreateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", Object)
], User.prototype, "kafkaMessage", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
exports.UserModal = (0, typegoose_1.getModelForClass)(User);
