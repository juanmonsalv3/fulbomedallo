import { ObjectId } from 'mongodb'

export const setObjectId = (object: any) => ({
  ...object,
  _id: new ObjectId(object._id),
})
