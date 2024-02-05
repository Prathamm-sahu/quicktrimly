import mongoose from "mongoose";

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

const ShortUrl = mongoose.model("shorturl", ShortUrlSchema)

export default ShortUrl;