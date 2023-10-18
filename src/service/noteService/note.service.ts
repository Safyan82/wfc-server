import { noteModal } from "../../schema/notesSchema/note.schema";

export class NoteService{
    async upsertNote(input){
        try{
            const {_id, ...rest} = input;
            if(_id){
                const isNoteExist = await noteModal.findById(_id);
                if(isNoteExist){
                    const n = await noteModal.findByIdAndUpdate({_id},{$set:rest})
                    return{
                        success: 1,
                        message: JSON.stringify(n)
                    }
                }
            }
            await noteModal.create(input);
            return{
                success: 1,
                message: "Note added successfully"
            }
        }catch(err){
            return{
                success: 0,
                message: err.message,
            }
        }
    }

    async getNote(id:string){
        try{

            const note = await noteModal.findById(id);
            return{
                note,
                success: 1
            }
        }
        catch(err:any){
            throw new Error(err.message)
        }
    }

    async getNotes(){
        try{
            const note = await noteModal.find();
            return{
                success: 1,
                note,
            }
        }
        catch(err){
            return {
                message:"An error is encountered while reteriving the notes",
                success:0
            }
        }
    }

    
}