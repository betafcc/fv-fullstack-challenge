import { useState } from 'react'
import type { NextPage, InferGetServerSidePropsType } from 'next'
import InfiniteScroll from 'react-infinite-scroller'

import { trpc } from '../utils/trpc'
import type * as schema from '../server/schema'
import { helpers } from '../server/helpers'
import Post from '../components/Post'

const Feed: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData, initialNextPage }) => {
  const [items, setItems] = useState<schema.Post[]>(initialData)
  const [nextPage, setNextPage] = useState<number | null>(initialNextPage)
  const [loading, setLoading] = useState<boolean>(false)

  const loadMore = async () => {
    if (nextPage && !loading) {
      setLoading(true)
      try {
        const data = await trpc.infinitePosts.query({
          limit: 10,
          cursor: nextPage,
        })
        setItems(prevItems => [...prevItems, ...data.items])
        setNextPage(data.nextPage)
      } catch (error) {
        console.error('Failed to load more posts', error)
      }
      setLoading(false)
    }
  }

  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={nextPage !== null}
      loader={<div>Loading...</div>}
    >
      {items.map(item => (
        <Post key={item.id} {...item} />
      ))}
    </InfiniteScroll>
  )
}

export const getServerSideProps = async () => {
  const initialData = await helpers.infinitePosts.fetch({
    limit: 10,
    cursor: 1,
  })

  return {
    props: {
      initialData: initialData.items,
      initialNextPage: initialData.nextPage,
    },
  }
}

export default Feed
