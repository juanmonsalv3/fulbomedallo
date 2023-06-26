import React, {useEffect, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Field, Formik} from 'formik';
import {Field as FieldType, Match, Stats} from '@/types/matches';
import axios from 'axios';
import dayjs, {Dayjs} from 'dayjs';
import * as Yup from 'yup';
import {ObjectId} from 'mongodb';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Input = styled(MuiInput)`
  width: 42px;
`;

const FORMAT = 'YYYY/MM/DD';

interface MatchData {
  name: string;
  field_id?: string;
  date: Dayjs;
  golesLocal: number;
  golesVisitante: number;
  local: Stats[];
  visitante: Stats[];
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
    golesLocal: matchData?.golesLocal || 0,
    golesVisitante: matchData?.golesVisitante || 0,
    local: matchData?.local || [
        { "id": "asdasd", "goles": 0, "asistencias": 1 },
        { "id": "asdasd", "goles": 2, "asistencias": 0 },
        { "id": "asdasd", "goles": 0, "asistencias": 1 }
    ],
    visitante: matchData?.visitante || [
        { "id": "asdasd", "goles": 0, "asistencias": 1 },
        { "id": "asdasd", "goles": 0, "asistencias": 0 },
        { "id": "asdasd", "goles": 1, "asistencias": 0 }
    ],
  };

  const onSubmit = async (
    values: MatchData,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    const golesLocal =  values.local.reduce((acc, current) => acc + current?.goles, 0);
    const golesVisitante =  values.visitante.reduce((acc, current) => acc + current?.goles, 0);

    const payload = {
      ...values,
      date: values.date.format(FORMAT),
      _id: matchData?._id
    };


    /*const response = await axios.post('/api/matches', {
      ...values,
      date: values.date.format(FORMAT),
      _id: matchData?._id,
      golesLocal,
      golesVisitante,
    };

    console.log(payload)

    /*const response = await axios.post('/api/matches', {
      ...values,
      date: values.date.format(FORMAT),
      _id: matchData?._id,
      golesLocal,
      golesVisitante,
    });
    resetForm();
    onSave(response.data.insertedId);*/
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
                inputProps={{
                  step: 1,
                  min: 0
                }}
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
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Local</Typography>
              <Typography>0</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Visitante</Typography>
              <Typography>0</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid justifyContent="space-between" alignItems="center" style={{ marginLeft: '115px' }}>
                  <div>
                    <span style={{margin: '0 5px', fontWeight: 600}}>Goles</span>
                    <span style={{margin: '0 5px', fontWeight: 600}}>Asist</span>
                  </div>
              </Grid>
              <List dense>
                {generate(
                  <ListItem disableGutters
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary="Single-line item"/>
                    <Input
                      style={{margin: '0 5px'}}
                      size="small"
                      type='number'
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                      }}
                    />
                    <Input
                      style={{margin: '0 5px'}}
                      size="small"
                      type='number'
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                      }}
                    />
                  </ListItem
                    >,
                )}
                <Button type='submit' variant='outlined' color='primary' size="small" style={{marginTop: '5px'}}>
                  Agregar Local
                </Button>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid justifyContent="space-between" alignItems="center" style={{ marginLeft: '115px' }}>
                  <div>
                    <span style={{margin: '0 5px', fontWeight: 600}}>Goles</span>
                    <span style={{margin: '0 5px', fontWeight: 600}}>Asist</span>
                  </div>
              </Grid>
              <List dense>
                {generate(
                  <ListItem disableGutters
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary="Single-line item"/>
                    <Input
                      style={{margin: '0 5px'}}
                      size="small"
                      type='number'
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                      }}
                    />
                    <Input
                      style={{margin: '0 5px'}}
                      size="small"
                      type='number'
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                      }}
                    />
                  </ListItem
                    >,
                )}
                <Button type='submit' variant='outlined' color='primary' size="small" style={{marginTop: '5px'}}>
                  Agregar Visitante
                </Button>
              </List>
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
