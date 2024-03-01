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
}