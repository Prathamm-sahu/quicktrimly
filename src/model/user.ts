import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id?: string;
  firstName: string
  lastName: string
  email: string
  tinyURL: string[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tinyURL: [
      {
        type: Schema.Types.ObjectId,
        ref: "shorturl",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User
