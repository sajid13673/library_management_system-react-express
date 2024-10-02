import { CircularProgress, Typography } from '@material-ui/core'
import React from 'react'

function Loading() {
  return (
    <Typography variant='h3' >Loading...  <CircularProgress /></Typography>
  )
}

export default Loading