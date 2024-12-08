import { JWTPayload } from 'hono/utils/jwt/types'

export type User = {
  id: number
  email: string
  name: string | null
  password: string
  isActive: boolean
  role: string
  photos?: Photo[]
  createdAt: Date
}

export type CreateUser = {
  email: string
  name: string | null
  password: string
  isActive?: boolean
  role?: string
}

export type UpdateUser = {
  email?: string
  name?: string | null
  password?: string
}

export type Photo = {
  id: number
  url: string
  user_id: number
  createdAt: Date
}

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user'
}

export type CustomFile = File & {
  name: string
  type: string
  size: number
  data: ArrayBuffer
}

export type TokenPayload = JWTPayload & {
  sub: {
    email: string
  }
}