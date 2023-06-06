import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

function AddPlayerForm({ onFinish }: { onFinish: () => void }) {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onSubmit = useCallback(() => {
    axios
      .put('/api/players/new', {
        name,
        nickname,
      })
      .then(function (response) {
        onFinish();
        toast.success('Listo el pollo.');
      })
      .catch(function (error) {
        toast.error('Algo explotó.');
      });
  }, [name, nickname, onFinish]);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' onClick={onSubmit}>
          Agregar
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddPlayerForm;
