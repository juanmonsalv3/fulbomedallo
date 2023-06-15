import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Field } from 'formik';
import { Field as FieldType } from '@/types/matches';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import * as Yup from 'yup';

const FORMAT = 'DD/MM/YYYY';

interface MatchData {
  name: string;
  field: string;
  date: Dayjs;
}

interface AddMatchFormProps {
  onAddMatch: (matchData: MatchData) => void;
}

const MatchSchema = Yup.object().shape({
  name: Yup.string(),
  field: Yup.string().required('Required'),
});

const AddMatchForm: React.FC<AddMatchFormProps> = ({ onAddMatch }) => {
  const [fields, setFields] = useState<FieldType[]>([]);

  useEffect(() => {
    axios
      .get('/api/fields')
      .then((result) => setFields(result.data as FieldType[]));
  }, [setFields]);
  const initialValues: MatchData = {
    name: '',
    field: '',
    date: dayjs(),
  };

  const onSubmit = async (
    values: MatchData,
    { resetForm }: { resetForm: () => void }
  ) => {
    const response = await axios.post('/api/matches', {
      ...values,
      date: values.date.format(FORMAT),
    });

    onAddMatch(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={MatchSchema}
    >
      {({ values, handleSubmit, handleChange, errors, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid
              container
              item
              xs={12}
              md={5}
              gap={2}
              direction='column'
              justifyContent='flex-start'
              wrap='nowrap'
              flexBasis='auto'
            >
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
                  name='field'
                  label='Campo'
                  value={values.field}
                  onChange={handleChange}
                  error={!!errors.field}
                  fullWidth
                >
                  {fields.map((field) => (
                    <MenuItem key={field._id} value={field._id}>
                      {field.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid item xs={12}>
                <DatePicker
                  defaultValue={values.date}
                  format={FORMAT}
                  onChange={(val: Dayjs | null) =>
                    setFieldValue('date', val as Dayjs)
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary'>
                Agregar
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AddMatchForm;
