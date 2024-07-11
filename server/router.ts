import { z } from 'zod'

import { procedure, router } from './trpc'
import * as service from './service'

export const appRouter = router({
  infinitePosts: procedure
    .input(z.object({ limit: z.number(), cursor: z.number() }))
    .query(({ input }) => service.getPosts(input)),

  infinitePhotos: procedure
    .input(z.object({ limit: z.number(), cursor: z.number() }))
    .query(({ input }) => service.getPhotos(input)),

  getComments: procedure
    .input(z.object({ postId: z.number() }))
    .query(({ input }) => service.getComments(input)),
})

// export type definition of API
export type AppRouter = typeof appRouter
