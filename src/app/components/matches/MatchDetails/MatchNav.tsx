import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { StepButton, Tab, Tabs } from '@mui/material'
import { Match } from '@/types/matches'
import MatchPlayersList from './MatchPlayersList'
import MatchTeams from './MatchTeams'
import MatchEvents from './MatchEvents'

interface Props {
  matchData: Match
}

export default function MatchNav({ matchData }: Props) {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = (index: number) => {
    return () => setActiveStep(index)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  // return (
  //   <Box>
  //     <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
  //       <Step>
  //         <StepButton color="inherit" onClick={handleNext(0)}>
  //           <StepLabel>Lista de Jugadores</StepLabel>
  //         </StepButton>
  //       </Step>
  //       <Step>
  //         <StepButton color="inherit" onClick={handleNext(1)}>
  //           <StepLabel>Equipos</StepLabel>
  //         </StepButton>
  //       </Step>
  //       <Step>
  //         <StepButton color="inherit" onClick={handleNext(2)}>
  //           <StepLabel>Eventos</StepLabel>
  //         </StepButton>
  //       </Step>
  //     </Stepper>
  //     {activeStep === 0 && (
  //       <MatchPlayersList
  //         matchData={matchData}
  //         onSave={() => setActiveStep(1)}
  //       />
  //     )}
  //     {activeStep === 1 && <MatchTeams />}
  //     {activeStep === 2 && <MatchEvents />}
  //   </Box>
  // )

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  function TabPanel({
    index,
    children,
  }: React.PropsWithChildren<{ index: number }>) {
    return (
      <Box
        sx={{
          my: 2,
        }}
        display={index === value ? 'block' : 'none'}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Equipos" />
          <Tab label="Eventos" />
        </Tabs>
      </Box>
      <TabPanel index={0}>
        <MatchTeams matchData={matchData} />
      </TabPanel>
      <TabPanel index={1}>
        <MatchEvents />
      </TabPanel>
    </Box>
  )
}
