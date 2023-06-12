import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { Formik, Field } from 'formik';
import { Field as FieldType } from '@/types/matches';
import axios from 'axios';
import * as Yup from 'yup';

interface MatchData {
  name: string;
  field: string;
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
  };

  const onSubmit = (
    values: MatchData,
    { resetForm }: { resetForm: () => void }
  ) => {
    onAddMatch(values);
    resetForm();
  };

  return (
    <div>
      <Typography variant='h6' gutterBottom>
        Add Match
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={MatchSchema}
      >
        {({ values, handleSubmit, handleChange, errors }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name='name'
                  label='Nombre'
                  fullWidth
                  error={!!errors.name}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Button type='submit' variant='contained' color='primary'>
                  Add Match
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddMatchForm;
