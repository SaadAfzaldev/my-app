
import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content:  {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    }
})


export interface User extends Document{
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const userSchema: Schema<User> = new Schema({
    username: {
      type: String,
      required: [true , "Username is required"],
      trim: true,
      unique: true,
    },
    password: {
        type: String,
        required: [true , "Password is required"],
      },
    email: {
      type: String,
      required:[true , "Email is required"],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    verifyCode: {
      type: String,
      required: true,
    },
    verifyCodeExpiry: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAcceptingMessages: {
      type: Boolean,
      required: true,
      default: true,
    },
    messages: [messageSchema]
  });

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', userSchema);

export default UserModel;

