import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FormEvent, useEffect } from 'react';
import { Player } from '@/types/players';

const initialValues = {
  name: '',
  lastName: '',
  telephone: '',
  jerseyNumber: 0,
  email: '',
  position: '',
  nickname: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('Los apellidos son requeridos'),
  telephone: Yup.string().required('El teléfono es requerido'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  jerseyNumber: Yup.number().required('El número dorsal es requerido'),
  position: Yup.string().required('La posición es requerida'),
  nickname: Yup.string().required('El nickname es requerido'),
});

const formikState = {
  initialValues,
  validationSchema,
  onSubmit: () => {},
  initialErrors: {
    name: 'Required',
    lastName: 'Required',
    telephone: 'Required',
    email: 'Required',
    jerseyNumber: 'Required',
    position: 'Required',
    nickname: 'Required',
  },
  initialTouched: {
    name: false,
    lastName: false,
    telephone: false,
    email: false,
    jerseyNumber: false,
    position: false,
    nickname: false,
  },
};

interface PlayerFormProps {
  player?: Player;
  onUpdatePlayerList: () => void;
  closeEdit?: () => void;
}

export const PlayersForm = ({
  player,
  onUpdatePlayerList,
  closeEdit,
}: PlayerFormProps) => {
  const formik = useFormik(formikState);
  const { setValues } = formik;
  const submit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      formik.resetForm();

      const basePlayerUrl = '/api/players';
      const url = player ? `${basePlayerUrl}/${player._id}` : basePlayerUrl;
      const method = player ? 'PATCH' : 'POST';
      const message = player ? 'Jugador Actualizado.' : 'Jugador Agregado.';

      await axios.request({ url, method, data: formik.values });

      if (player && closeEdit) {
        closeEdit();
      }
      onUpdatePlayerList();
      toast.success(message);
    } catch (e) {
      toast.error('Algo explotó.');
    }
  };

  useEffect(() => {
    if (player) {
      setValues({ ...player });
    }
  }, [player, setValues]);

  return (
    <form onSubmit={submit} style={{ paddingTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id='name'
            name='name'
            label='Nombre'
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='lastName'
            name='lastName'
            label='Apellidos'
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='telephone'
            name='telephone'
            label='Teléfono'
            fullWidth
            value={formik.values.telephone}
            onChange={formik.handleChange}
            error={formik.touched.telephone && Boolean(formik.errors.telephone)}
            helperText={formik.touched.telephone && formik.errors.telephone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='email'
            name='email'
            label='Correo electrónico'
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='jerseyNumber'
            name='jerseyNumber'
            label='Número dorsal'
            type='number'
            fullWidth
            value={formik.values.jerseyNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.jerseyNumber && Boolean(formik.errors.jerseyNumber)
            }
            helperText={
              formik.touched.jerseyNumber && formik.errors.jerseyNumber
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='position'
            name='position'
            label='Posición'
            fullWidth
            value={formik.values.position}
            onChange={formik.handleChange}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='nickname'
            name='nickname'
            label='Alias'
            fullWidth
            value={formik.values.nickname}
            onChange={formik.handleChange}
            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
            helperText={formik.touched.nickname && formik.errors.nickname}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction='row'
            justifyContent='flex-end'
            alignItems='center'
            spacing={2}
          >
            <Button type='submit' color='primary' disabled={!formik.isValid}>
              Guardar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
