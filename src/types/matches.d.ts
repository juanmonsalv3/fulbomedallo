export interface Field {
  _id: string;
  name: string;
  capacity: number;
}

export interface Match {
  _id: string;
  name: string;
  place: Field;
}