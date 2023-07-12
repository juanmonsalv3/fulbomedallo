import { Skeleton, SkeletonProps } from '@mui/material'
import React from 'react'

function Loading({ height = 100, width = '100%', ...props }: SkeletonProps) {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      width={width}
      height={height}
      {...props}
    />
  )
}

export default Loading
