import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { NoteService } from "../../service/noteService/note.service";
import { NoteInput, NoteResponse } from "../../schema/noteSchema/note.schema";
import { Context } from "../../utils/context";

@Resolver()
export class NoteResolver{
    constructor(private noteService: NoteService){
        this.noteService = new NoteService();
    }

    @Authorized()
    @Mutation(()=>NoteResponse)
    newNote(@Arg('input') input:NoteInput, @Ctx() ctx: Context){
        return this.noteService.newNote(input, ctx?.user?.employeeId)
    }

    @Authorized()
    @Query  (()=>NoteResponse)
    getNote(@Arg('createdFor') createdFor: String, @Arg('objectType') objectType:String){
        return this.noteService.getNote(createdFor, objectType)
    }

}