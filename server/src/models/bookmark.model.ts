import mongoose from "mongoose";

export interface BookmarkDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new mongoose.Schema<BookmarkDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const BookmarkModel = mongoose.model<BookmarkDocument>(
  "Bookmark",
  BookmarkSchema
);

export default BookmarkModel;
