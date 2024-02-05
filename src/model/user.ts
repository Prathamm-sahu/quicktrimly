import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id?: string;
  firstName: string
  lastName: string
  email: string
  password: string
  tinyURL?: string[]
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
    password: {
      type: String,
      required: true,
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

const User = mongoose.models.users || mongoose.model<IUser>("users", UserSchema);

export default User
