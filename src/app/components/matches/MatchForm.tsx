import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Button, Grid, MenuItem, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Field, Formik } from 'formik'
import { Field as FieldType, Match } from '@/types/matches'
import dayjs, { Dayjs } from 'dayjs'
import { toast } from 'react-hot-toast'
import { matchesApi } from '@/api'
import { ObjectId } from 'mongodb'

const FORMAT = 'YYYY/MM/DD'

interface AddMatchFormProps {
  match?: Match | null
  onSave: () => void
}

interface EmptyMatch {
  name: string
  field_id?: ObjectId | string
  date: Dayjs
}

const MatchSchema = Yup.object().shape({
  name: Yup.string(),
  field_id: Yup.string().required('Required'),
})

const MatchForm: React.FC<AddMatchFormProps> = ({ match, onSave }) => {
  const [fields, setFields] = useState<FieldType[]>([])

  const fetchFields = useCallback(async () => {
    const fields = await matchesApi.getFields()
    setFields(fields)
  }, [setFields])

  useEffect(() => {
    fetchFields()
  }, [fetchFields])

  const initialValues: EmptyMatch = {
    name: match?.name || '',
    field_id: match?.field?._id || '',
    date: match ? dayjs(match.date) : dayjs(),
  }

  const onSubmit = async (
    values: EmptyMatch,
    { resetForm }: { resetForm: () => void }
  ) => {
    const selectedField = fields.find(
      (f) => f._id === values.field_id
    ) as FieldType

    let response

    if (match) {
      response = await matchesApi.editMatch({
        _id: match._id,
        name: values.name,
        date: values.date.format(FORMAT),
        field: selectedField,
      })
    } else {
      response = await matchesApi.addMatch({
        name: values.name,
        date: values.date.format(FORMAT),
        field: selectedField,
      })
    }

    if (response) {
      const message = match ? 'Cotejo Actualizado.' : 'Cotejo Agregado.'
      toast.success(message)
      onSave()
      resetForm()
    }
  }

  if (fields.length === 0) {
    return null
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={MatchSchema}
    >
      {({ values, handleSubmit, handleChange, errors, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} zeroMinWidth>
              <Field
                as={TextField}
                name="name"
                label="Nombre"
                inputProps={{
                  step: 1,
                  min: 0,
                }}
                fullWidth
                error={!!errors.name}
              />
            </Grid>
            <Grid item xs={12} zeroMinWidth>
              <TextField
                select
                name="field_id"
                label="Campo"
                value={values.field_id}
                onChange={handleChange}
                error={!!errors.field_id}
                fullWidth
              >
                {fields.map((field) => (
                  <MenuItem
                    key={field._id.toString()}
                    value={field._id.toString()}
                  >
                    {field.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                defaultValue={values.date}
                format={FORMAT}
                onChange={(val: Dayjs | null) =>
                  setFieldValue('date', val as Dayjs)
                }
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12} textAlign={'right'}>
              <Button type="submit" variant="contained" color="primary">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default MatchForm
