"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const note_schema_1 = require("../../schema/notesSchema/note.schema");
class NoteService {
    async upsertNote(input) {
        try {
            const { _id, ...rest } = input;
            if (_id) {
                const isNoteExist = await note_schema_1.noteModal.findById(_id);
                if (isNoteExist) {
                    const n = await note_schema_1.noteModal.findByIdAndUpdate({ _id }, { $set: rest });
                    return {
                        success: 1,
                        message: JSON.stringify(n)
                    };
                }
            }
            await note_schema_1.noteModal.create(input);
            return {
                success: 1,
                message: "Note added successfully"
            };
        }
        catch (err) {
            return {
                success: 0,
                message: err.message,
            };
        }
    }
}
exports.NoteService = NoteService;
