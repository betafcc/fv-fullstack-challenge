/**
 * The schema/model/entities file.
 * This is where we would setup the ORM models,
 * If I had time, I would setup Drizzle.
 * 
 * Since we are not using an ORM, here are just the TS definitions for each entity
 */

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type Photo = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}
