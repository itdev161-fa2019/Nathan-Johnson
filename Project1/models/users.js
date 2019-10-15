import mongoose from 'mongoose';
import { userInfo } from 'os';

const UserSchema = new mongoose.Schema{{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String;
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}};

const User = mongoose.model{'user', UserSchema};

export default user;

