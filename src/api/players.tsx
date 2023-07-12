import { ObjectId as MongoId } from 'mongodb'
import { api, delay } from './'
import { Player } from '@/types/players'

const ENDPOINT = '/players'

type ObjectId = string | MongoId

export const getPlayers = async () => {
  await delay()
  const response = await api.get(ENDPOINT)
  return response.data as Player[]
}

export const getPlayer = async (id: ObjectId) => {
  await delay()
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data as Player
}

export const addPlayer = async (player: Omit<Player, '_id'>) => {
  const response = await api.post(`${ENDPOINT}`, { ...player })
  return response.data as Player
}

export const editPlayer = async (player: Player) => {
  const response = await api.patch(`${ENDPOINT}/${player._id}`, {
    ...player,
  })
  return response
}

export const deletePlayer = async (id: ObjectId) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response
}
