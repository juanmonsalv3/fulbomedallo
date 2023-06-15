import { ObjectId } from "mongodb";

export interface Field {
  _id: string;
  name: string;
  capacity: number;
}

export interface Match {
  _id: ObjectId;
  name: string;
  field: Field;
  date: string;
}