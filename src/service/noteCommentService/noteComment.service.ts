import dayjs from "dayjs";
import { NoteCommentModal } from "../../schema/noteComment/noteComment.schema";

export class NoteCommentService{
    
    async newNoteComment(input, commentedBy){
        try{
            const noteComment = await NoteCommentModal.create({...input, commentedBy});
            return{
                message: "Note Comment Added",
                response: noteComment
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    async UpdateNoteComment(input){
        try{
            const {_id, ...rest} = input;
            const updatedComment = await NoteCommentModal.updateOne({_id},{$set:{...rest, updatedAt: dayjs().format("DD/MM/YYYY HH:mm")}});
            return{
                message:"comment added",
                response: updatedComment
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    async deleteNoteComment(commentId){
        try{
            const deletedComment = await NoteCommentModal.deleteOne({_id:commentId});
            return{
                message:"comment deleted",
                response: deletedComment
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

}