import mongoose from "mongoose";
import config from "config";

export async function connection() {
    try{
        await mongoose.connect(config.get('dbUri'));
        console.log("connected ...");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

