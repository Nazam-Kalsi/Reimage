import mongoose, {Schema, model} from "mongoose";

const logsSchame = new Schema({
    editor:String,
    action:String,
    model: String,  
    doc: {
        type: mongoose.Schema.Types.Mixed,
    },     
    documentId:{
          type: mongoose.Schema.Types.ObjectId,
          required:true,
      },
},{timestamps:true});

export const Log = model("Log",logsSchame);
