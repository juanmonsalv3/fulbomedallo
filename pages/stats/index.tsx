import PageHeader from '@/app/components/common/pageHeader'
import {Container} from '@mui/material'
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Head from 'next/head'
import React from 'react'

function Stats() {
    const columns: GridColDef[] = [
      { field: 'number', headerName: '#', flex: 0.2, disableColumnMenu: true },
      { field: 'fullName', headerName: 'Name', flex: 2 },
      { field: 'srGol', headerName: '# Games srGol', flex: 1.1, disableColumnMenu: true },
      { field: 'buho', headerName: '# Games Buho', flex: 1, disableColumnMenu: true },
      { field: 'nGames', headerName: '# Total Games', flex: 1, disableColumnMenu: true },
      { field: 'goals', headerName: 'Goals', flex: 1, disableColumnMenu: true },
      { field: 'assists', headerName: 'Assists', flex: 1, disableColumnMenu: true },
    ];
    const rows = [
      { id: 1, number: 8, fullName: 'Juan Monsalve', srGol: 10, buho: 5, nGames: 15, goals: 2, assists: 1 },
      { id: 2, number: 2, fullName: 'Juan Burgos', srGol: 15, buho: 1, nGames: 16, goals: 0, assists: 5 },
      { id: 3, number: 10, fullName: 'Jaime Padron', srGol: 11, buho: 6, nGames: 17, goals: 2, assists: 7 },
      { id: 4, number: 15, fullName: 'Bryan Sarmiento', srGol: 20, buho: 3, nGames: 23, goals: 9, assists: 1 },
      { id: 5, number: 10, fullName: 'Andres Ruiz', srGol: 6, buho: 12, nGames: 18, goals: 4, assists: 10 },
    ]
  return (
    <>
      <Head>
        <title>Fulbo Medallo - Stats</title>
      </Head>
      <PageHeader title='Stats'>
      </PageHeader>
        <Container sx={{ py: 4 }} maxWidth='md'>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            density='compact'
            hideFooter
          />
        </div>
      </Container>
    </>
  )
}

export default Stats