"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const branchObject_resolver_1 = require("./branchObjectResolver/branchObject.resolver");
const branch_resolver_1 = __importDefault(require("./branchResolver/branch.resolver"));
const branchView_resolver_1 = __importDefault(require("./branchViewResolver/branchView.resolver"));
const group_resolver_1 = require("./groupResolver/group.resolver");
const kafka_resolver_1 = __importDefault(require("./kafka.resolver"));
const note_resolver_1 = require("./noteResolver/note.resolver");
const propertiesResolver_1 = require("./propertiesResolver/propertiesResolver");
const user_resolver_1 = __importDefault(require("./user.resolver"));
exports.resolvers = [
    user_resolver_1.default,
    kafka_resolver_1.default,
    branch_resolver_1.default,
    group_resolver_1.GroupResolver,
    propertiesResolver_1.PropertiesResolver,
    branchObject_resolver_1.BranchObjectResolver,
    branchView_resolver_1.default,
    note_resolver_1.NoteResolver,
];
