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
exports.NoteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const note_schema_1 = require("../../schema/notesSchema/note.schema");
const note_service_1 = require("../../service/noteService/note.service");
let NoteResolver = class NoteResolver {
    constructor(noteService) {
        this.noteService = noteService;
        this.noteService = new note_service_1.NoteService();
    }
    upsertNote(input) {
        return this.noteService.upsertNote(input);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => note_schema_1.noteGenericResponse),
    __param(0, (0, type_graphql_1.Arg)('input', { validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_schema_1.NoteInput]),
    __metadata("design:returntype", void 0)
], NoteResolver.prototype, "upsertNote", null);
NoteResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteResolver);
exports.NoteResolver = NoteResolver;
