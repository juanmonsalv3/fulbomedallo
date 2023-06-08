import PageHeader from '@/app/components/common/pageHeader'
import { Container, Stack } from '@mui/material'
import Head from 'next/head'
import React from 'react'

function Games() {
  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <PageHeader title='Ultimos Partidos'>
        <Stack direction='row' spacing={2} justifyContent='left'>
          Buttons
        </Stack>
      </PageHeader>
      <Container sx={{ py: 4 }} maxWidth='md'>
        Games List
      </Container>
    </>
  )
}

export default Games