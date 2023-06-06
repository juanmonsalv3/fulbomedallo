import { Button, Grid, TextField } from '@mui/material';
import React from 'react';

function AddPlayerForm() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          id='name'
          name='name'
          label='Nombre'
          fullWidth
          autoComplete='given-name'
          variant='standard'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id='nickname'
          name='nickname'
          label='Apodo'
          fullWidth
          autoComplete='nickname'
          variant='standard'
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained'>
          Agregar
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddPlayerForm;
