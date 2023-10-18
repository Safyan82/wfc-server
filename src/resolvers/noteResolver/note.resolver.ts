import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { NoteInput, noteGenericResponse } from "../../schema/notesSchema/note.schema";
import { NoteService } from "../../service/noteService/note.service";

@Resolver()
export class NoteResolver{
    constructor( private noteService : NoteService){
        this.noteService = new NoteService();
    }

    @Mutation(()=>noteGenericResponse)
    upsertNote(@Arg('input', {validate:true}) input:NoteInput){
        return this.noteService.upsertNote(input);
    }

    @Query(()=>noteGenericResponse)
    getNote(@Arg('id',{validate:true}) id:string)
    {
        return this.noteService.getNote(id);
    }

    @Query(()=>noteGenericResponse)
    getNotes()
    {
        return this.noteService.getNotes();
    }
}