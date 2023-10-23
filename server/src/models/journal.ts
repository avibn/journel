import { InferSchemaType, Schema, model } from "mongoose";

const journalSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

type Journal = InferSchemaType<typeof journalSchema>;

export default model<Journal>("Journal", journalSchema);