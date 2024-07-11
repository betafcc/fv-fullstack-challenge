/**
 * The schema/model/entities file.
 * This is where we would setup the ORM models,
 * If I had time, I would setup Drizzle.
 * I would also consider using Prisma, but Theo said it's too heavy and don't play well running on the edge.
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
