import { createServerSideHelpers } from '@trpc/react-query/server'
import superjson from 'superjson'

import { appRouter } from './router'

export const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: {},
  transformer: superjson,
})
