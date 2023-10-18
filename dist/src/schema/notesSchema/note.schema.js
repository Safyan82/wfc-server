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
exports.NoteInput = exports.noteGenericResponse = exports.noteModal = exports.Note = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
let Note = class Note {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Note.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Note.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true, defaultValue: 0, description: 'This variable use on frontend side just to pin the comment' }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Note.prototype, "pinned", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Note.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Note.prototype, "visibility", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Note.prototype, "branchId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Note.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Note.prototype, "followUp", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Note.prototype, "updatedBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Note.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Note.prototype, "isdeleted", void 0);
Note = __decorate([
    (0, type_graphql_1.ObjectType)()
], Note);
exports.Note = Note;
exports.noteModal = (0, typegoose_1.getModelForClass)(Note);
let noteGenericResponse = class noteGenericResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], noteGenericResponse.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], noteGenericResponse.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], noteGenericResponse.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], noteGenericResponse.prototype, "message", void 0);
noteGenericResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], noteGenericResponse);
exports.noteGenericResponse = noteGenericResponse;
let NoteInput = class NoteInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], NoteInput.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NoteInput.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], NoteInput.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], NoteInput.prototype, "visibility", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NoteInput.prototype, "branchId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NoteInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NoteInput.prototype, "followUp", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], NoteInput.prototype, "pin", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], NoteInput.prototype, "isdeleted", void 0);
NoteInput = __decorate([
    (0, type_graphql_1.InputType)()
], NoteInput);
exports.NoteInput = NoteInput;
