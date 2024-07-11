/**
 * The service file should be the only file that directly uses the schema or external API.
 *
 * Here I'm handling the fetching and the pagination of the data.
 */
import queryString from 'query-string'

import type * as schema from './schema'

/**
 * A helper function to fetch paginated data from an enpoint.
 * It assumes the endpoint supports `_limit` and `_page` query params, as well as `X-Total-Count` header.
 */
const paginated =
  <A>(url: string) =>
  async (options: {
    cursor: number
    limit: number
  }): Promise<{ items: Array<A>; nextPage: number | null }> => {
    const response = await fetch(
      queryString.stringifyUrl({
        url,
        query: { _limit: options.limit, _page: options.cursor },
      }),
    )

    const totalCount = parseInt(
      response.headers.get('X-Total-Count') || '0',
      10,
    )
    const hasMore = options.cursor * options.limit < totalCount

    return {
      items: await response.json(),
      nextPage: hasMore ? options.cursor + 1 : null,
    }
  }

// export const getPosts = async (options: {
//   cursor: number
//   limit: number
// }): Promise<{ posts: Array<schema.Post>; nextPage: number | null }> => {
//   const response = await fetch(
//     queryString.stringifyUrl({
//       url: 'https://jsonplaceholder.typicode.com/posts',
//       query: { _limit: options.limit, _page: options.cursor },
//     }),
//   )

//   const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10)
//   const hasMore = options.cursor * options.limit < totalCount

//   return {
//     posts: await response.json(),
//     nextPage: hasMore ? options.cursor + 1 : null,
//   }
// }
// getPosts({ cursor: 34, limit: 3 }).then(console.log)

export const getPosts = paginated<schema.Post>(
  'https://jsonplaceholder.typicode.com/posts',
)

export const getPhotos = paginated<schema.Photo>(
  'https://jsonplaceholder.typicode.com/photos',
)

// TODO: maybe paginate this too?
export const getComments = (options: {
  postId: number
}): Promise<Array<schema.Comment>> =>
  fetch(
    queryString.stringifyUrl({
      url: 'https://jsonplaceholder.typicode.com/comments',
      query: { postId: options.postId },
    }),
  ).then(r => r.json())
