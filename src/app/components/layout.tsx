import { PropsWithChildren } from 'react'
import ResponsiveAppBar from './AppBar'
import { Container, Paper } from '@mui/material'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <ResponsiveAppBar />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {children}
        </Paper>
      </Container>
    </>
  )
}
