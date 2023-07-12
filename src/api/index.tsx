import axios from 'axios'
import * as playersApi from './players'
import * as matchesApi from './matches'

export const delay = () =>
  new Promise<void>((res) => setTimeout(() => res(), 500))

export const api = axios.create({
  baseURL: '/api',
})

export { playersApi, matchesApi }
