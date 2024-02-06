import mongoose from "mongoose";

export interface IShortUrl {
  _id?: string
  shortUrl: string
  originalURL: string
  visits: {
    timestamps: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

const ShortUrlSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    originalURL: {
      type: String,
      required: true,
    },
    visits: [{
      timestamps: {
        type: Date
      }
    }]
  }, 
  {
    timestamps: true
  }
)

const ShortUrl = mongoose.models.shorturl || mongoose.model<IShortUrl>("shorturl", ShortUrlSchema)

export default ShortUrl;