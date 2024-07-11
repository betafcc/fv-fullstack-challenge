import { useState } from 'react'
import type { NextPage, InferGetServerSidePropsType } from 'next'
import InfiniteScroll from 'react-infinite-scroller'

import { trpc } from '../utils/trpc'
import type * as schema from '../server/schema'
import { helpers } from '../server/helpers'
import Post from '../components/Post'
import { Container } from '@mui/material'
import { PhotoGrid } from '../components/PhotoGrid'
import Head from 'next/head'

const Vault: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData, initialNextPage }) => {
  const [items, setItems] = useState<schema.Photo[]>(initialData)
  const [nextPage, setNextPage] = useState<number | null>(initialNextPage)
  const [loading, setLoading] = useState<boolean>(false)

  const loadMore = async () => {
    if (nextPage && !loading) {
      setLoading(true)
      try {
        const data = await trpc.infinitePhotos.query({
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
    <>
      <Head>
        <title>Vault</title>
        <meta name="description" content="Vault page description" />
        {/* social cards */}
      </Head>

      <Container>
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={nextPage !== null}
          loader={<div key={0}>Loading...</div>}
        >
          <PhotoGrid photos={items} />
        </InfiniteScroll>
      </Container>
    </>
  )
}

export const getServerSideProps = async () => {
  const initialData = await helpers.infinitePhotos.fetch({
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

export default Vault
