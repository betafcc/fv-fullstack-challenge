import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Collapse,
  CircularProgress,
} from '@mui/material'

import * as schema from '../server/schema'
import { trpc } from '../utils/trpc'

const Post: React.FC<schema.Post> = ({ id, body, title, userId }) => {
  const [comments, setComments] = useState([] as Array<schema.Comment>)
  const [showComments, setShowComments] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleToggleComments = () => {
    setShowComments(prev => !prev)
  }

  useEffect(() => {
    trpc.getComments.query({ postId: id }).then(comments => {
      setComments(comments)
      setLoading(false)
    })
  }, [id])

  return (
    <Box sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }}>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body1">{body}</Typography>
      <Button
        onClick={handleToggleComments}
        sx={{ marginTop: 1 }}
        aria-expanded={showComments}
        aria-controls={`comments-${id}`}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          `Comments (${comments.length})`
        )}
      </Button>
      <Collapse in={showComments} id={`comments-${id}`}>
        {comments.map(comment => (
          <Box
            key={comment.id}
            sx={{ marginTop: 1, paddingLeft: 2, borderLeft: '1px solid #ccc' }}
          >
            <Typography variant="body2">{comment.body}</Typography>
          </Box>
        ))}
      </Collapse>
    </Box>
  )
}

export default Post
