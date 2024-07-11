import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '../../../server/router'

// export API handler
// @link https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
