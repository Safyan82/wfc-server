import mongoose from "mongoose";
import { noteModal } from "../../schema/noteSchema/note.schema";

export class NoteService{
    async newNote(input, createdBy){
        try{
            const employeeNote = await noteModal.create({...input, createdBy});
            return {
                message: "Note created",
                response: employeeNote
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    async getNote(createdFor, objectType){
        try{
            const notes = await noteModal.aggregate([
                {
                    $match:{
                        $and:[
                            {createdFor: new mongoose.Types.ObjectId(createdFor)},
                            {objectType}
                        ]
                    }
                        
                },
                {
                    $lookup:{
                        localField:'createdBy',
                        foreignField:'_id',
                        as:'createdBy',
                        from:'employees'
                    }
                },
                {
                    $lookup:{
                        localField:'_id',
                        foreignField:'noteId',
                        as:'comments',
                        from:'notecomments'
                    }
                },
                {
                    $lookup:{
                        localField:'comments.commentedBy',
                        foreignField:'_id',
                        as:'commentedBy',
                        from:'employees',
                    }
                }
            ]);
            return{
                message: "All  Notes has been reterived",
                response: notes
            }
        }catch(err){
            throw new Error(err.message);
        }
    }

    async updateNote(input){
        try{
            const {_id, ...rest} = input;
            const updatedNotes = await noteModal.updateOne({_id},{$set:rest});
            return{
                message:"notes updated successfully",
                response: updatedNotes
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    async deleteNote(noteId){
        const deletedNote = await noteModal.deleteOne({_id:noteId})
        return{
            message: "Note Deleted Successfully",
            response: deletedNote
        }
    }
}