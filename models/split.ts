// models/split.ts
import { ObjectId } from "mongodb";

export interface UserSplit {
  _id?: ObjectId;
  userId: string;
  a: number; // Percentage for user A
  b: number; // Percentage for user B
}
