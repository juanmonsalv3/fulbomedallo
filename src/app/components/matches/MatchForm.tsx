import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Field } from 'formik';
import { Field as FieldType, Match } from '@/types/matches';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import * as Yup from 'yup';
import { ObjectId } from 'mongodb';

const FORMAT = 'YYYY/MM/DD';

interface MatchData {
  name: string;
  field_id?: string;
  date: Dayjs;
}

interface AddMatchFormProps {
  matchData?: Match;
  onSave: (id: ObjectId) => void;
}

const MatchSchema = Yup.object().shape({
  name: Yup.string(),
  field_id: Yup.string().required('Required'),
});

const MatchForm: React.FC<AddMatchFormProps> = ({ matchData, onSave }) => {
  const [fields, setFields] = useState<FieldType[]>([]);

  useEffect(() => {
    axios
      .get('/api/fields')
      .then((result) => setFields(result.data as FieldType[]));
  }, [setFields]);

  const initialValues: MatchData = {
    name: matchData?.name || '',
    field_id: matchData?.field._id.toString() || '',
    date: dayjs(matchData?.date),
  };

  const onSubmit = async (
    values: MatchData,
    { resetForm }: { resetForm: () => void }
  ) => {
    const saveMethod = matchData?._id ? axios.patch : axios.post;
    const response = await saveMethod('/api/matches', {
      ...values,
      date: values.date.format(FORMAT),
      _id: matchData?._id,
    });
    resetForm();
    onSave(response.data.insertedId);
  };

  if (fields.length === 0) {
    return null;
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
                name='name'
                label='Nombre'
                fullWidth
                error={!!errors.name}
              />
            </Grid>
            <Grid item xs={12} zeroMinWidth>
              <TextField
                select
                name='field_id'
                label='Campo'
                value={values.field_id}
                onChange={handleChange}
                error={!!errors.field_id}
                fullWidth
              >
                {fields.map((field) => (
                  <MenuItem key={field._id} value={field._id}>
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
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary'>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default MatchForm;
