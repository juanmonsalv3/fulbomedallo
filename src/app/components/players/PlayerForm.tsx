import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Grid, Stack, TextField } from '@mui/material'
import { toast } from 'react-hot-toast'
import { FormEvent, useEffect } from 'react'
import { Player } from '@/types/players'
import { playersApi } from '@/api'

const initialValues = {
  name: '',
  nickname: '',
}

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  nickname: Yup.string().required('El nickname es requerido'),
})

const formikState = {
  initialValues,
  validationSchema,
  onSubmit: () => {},
  initialErrors: {
    name: 'Required',
    nickname: 'Required',
  },
  initialTouched: {
    name: false,
    nickname: false,
  },
}

interface PlayerFormProps {
  player?: Player | null
  onSave: () => void
}

export const PlayerForm = ({ player, onSave }: PlayerFormProps) => {
  const formik = useFormik(formikState)
  const { setValues } = formik

  const submit = async (e: FormEvent) => {
    try {
      e.preventDefault()

      if (player) {
        await playersApi.editPlayer({ _id: player._id, ...formik.values })
      } else {
        await playersApi.addPlayer(formik.values)
      }

      const message = player ? 'Jugador Actualizado.' : 'Jugador Agregado.'
      toast.success(message)
      onSave()
      formik.resetForm()
    } catch (e) {
      toast.error('Algo explotó.')
    }
  }

  useEffect(() => {
    if (player) {
      setValues({ ...player })
    }
  }, [player, setValues])

  return (
    <form onSubmit={submit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            name="name"
            label="Nombre"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="nickname"
            name="nickname"
            label="Alias"
            fullWidth
            value={formik.values.nickname}
            onChange={formik.handleChange}
            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
            helperText={formik.touched.nickname && formik.errors.nickname}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formik.isValid}
            >
              Guardar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  )
}
