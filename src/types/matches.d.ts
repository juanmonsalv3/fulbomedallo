import {ObjectId} from "mongodb";

export interface Field {
  _id: string;
  name: string;
  capacity: number;
}

export interface Stats {
  id: string
  goles: number
  asistencias: number
}

export interface Match {
  _id: ObjectId;
  name: string;
  field: Field;
  date: string;
  golesLocal: number;
  golesVisitante: number;
  local: Stats[];
  visitante: Stats[];
}