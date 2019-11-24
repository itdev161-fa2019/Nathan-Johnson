import mongoose from "mongoose";
//import { stringify } from "querystring";
//import { truncate } from "fs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: true
  },
  imageData: {
    data: Buffer,
    contentType: String
  }
});

const User = mongoose.model("user", UserSchema);

export default User;
