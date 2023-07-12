import { ObjectId as MongoId } from 'mongodb'
import { api, delay } from './'
import { Field, Match } from '@/types/matches'

const ENDPOINT = '/matches'

type ObjectId = string | MongoId

export const getFields = async () => {
  const response = await api.get('/fields')
  return response.data as Field[]
}

export const getMatches = async () => {
  const response = await api.get(ENDPOINT)
  return response.data as Match[]
}

export const getMatch = async (id: ObjectId | string) => {
  if (!id) return
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data as Match
}

export const addMatch = async (match: Omit<Match, '_id'>) => {
  const response = await api.post(`${ENDPOINT}`, { ...match })
  return response.data as Match
}

export const editMatch = async (match: Match) => {
  const response = await api.patch(`${ENDPOINT}/${match._id}`, {
    ...match,
  })
  return response
}

export const deleteMatch = async (id: ObjectId) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response
}
