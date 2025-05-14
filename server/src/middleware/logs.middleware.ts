import { Schema } from "mongoose";
import { Log } from "../models/logs.model";

export const logsMiddleware = (schema: Schema, model: string) => {
  schema.post("save", async function (doc) {
    const editor = (this as any).$__.saveOptions?.editor;
    await Log.create({
      model,
      action: "Insert",
      documentId: doc._id,
      doc,
      editor,
    });
  });

  schema.post("deleteOne", async (doc) => {
    const editor = (this as any).options?.editor;
    await Log.create({
      model,
      action: "Delete",
      documentId: doc._id,
      doc,
      editor,
    });
  });

  schema.post("findOneAndDelete", async () => {
    const editor = (this as any).options.editor;
    const doc = (this as any).getQuery();
    await Log.create({
      model,
      actions: "Delete",
      documentId: doc._id,
      doc,
      editor,
    });
  });

  schema.post("updateOne", async (doc) => {
    const editor = (this as any).options?.editor;
    const data = (this as any).getUpdate();
    await Log.create({
      model,
      action: "Update",
      documentId: doc._id,
      doc: data,
      editor,
    });
  });

  schema.post("findOneAndUpdate",async(doc)=>{
    const editor = (this as any).options.editor;
     const data = (this as any).getUpdate();
        await Log.create({
            model,
            action:"update",
            doc:data,
            editor,
            documentId:doc._id,
        })
  })
};
