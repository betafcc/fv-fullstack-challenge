import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'

import type * as schema from '../server/schema'
import { Photo } from './Photo'

export const PhotoGrid: React.FC<{
  photos: schema.Photo[]
}> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<schema.Photo | null>(null)

  const handleOpenPhoto = (photo: schema.Photo) => {
    setSelectedPhoto(photo)
  }

  const handleClosePhoto = () => {
    setSelectedPhoto(null)
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    photo: schema.Photo,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleOpenPhoto(photo)
    }
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        {photos.map(photo => (
          <Grid item key={photo.id} xs={6} sm={4} md={3} lg={2}>
            <Box
              tabIndex={0}
              onClick={() => handleOpenPhoto(photo)}
              onKeyPress={event => handleKeyPress(event, photo)}
              sx={{
                cursor: 'pointer',
                width: 'fit-content',
                height: 'fit-content',
                padding: 0,
              }}
            >
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                width={150}
                height={150}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      {selectedPhoto && (
        <Photo
          open={!!selectedPhoto}
          onClose={handleClosePhoto}
          photo={selectedPhoto}
        />
      )}
    </Box>
  )
}
