import React from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

import type * as schema from '../server/schema'

export const Photo: React.FC<{
  open: boolean
  onClose: () => void
  photo: schema.Photo
}> = ({ open, onClose, photo }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="photo-title"
    >
      <DialogTitle id="photo-title">
        {photo.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Image
          src={photo.url}
          alt={photo.title}
          width={600}
          height={600}
          // layout="fill"
          style={{ width: '100%', height: 'auto' }}
        />
      </DialogContent>
    </Dialog>
  )
}
