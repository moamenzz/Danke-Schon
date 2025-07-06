import mongoose from "mongoose";

export interface MessageDocument extends mongoose.Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  text: string;
  images: string[];
  createdAt: Date;
}

const MessageSchema = new mongoose.Schema<MessageDocument>({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);

export default MessageModel;
