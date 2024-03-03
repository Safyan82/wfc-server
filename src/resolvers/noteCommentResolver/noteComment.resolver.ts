import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { NoteCommentService } from "../../service/noteCommentService/noteComment.service";
import { NoteCommentInput, NoteCommentResponse } from "../../schema/noteComment/noteComment.schema";
import { Context } from "../../utils/context";
import mongoose from "mongoose";

@Resolver()
export class NoteCommentResolver{
    
    constructor(private noteCommentService: NoteCommentService){
        this.noteCommentService = new NoteCommentService();
    }


    @Authorized()
    @Mutation(()=>NoteCommentResponse)
    newNoteComment(@Arg('input') input:NoteCommentInput, @Ctx() ctx:Context){
        return this.noteCommentService.newNoteComment(input, ctx?.user?.employeeId)
    }


    @Authorized()
    @Mutation(()=>NoteCommentResponse)
    updateNoteComment(@Arg('input') input:NoteCommentInput, @Ctx() ctx:Context){
        return this.noteCommentService.UpdateNoteComment(input)
    }

    @Authorized()
    @Mutation(()=>NoteCommentResponse)
    deleteNoteComment(@Arg('commentId') commentId:string){
        return this.noteCommentService.deleteNoteComment(new mongoose.Types.ObjectId(commentId))
    }
}