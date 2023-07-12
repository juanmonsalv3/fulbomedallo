import * as React from 'react'
import Box from '@mui/material/Box'
import { Tab, Tabs } from '@mui/material'
import { Match } from '@/types/matches'
import MatchTeams from './MatchTeams'
import MatchEvents from './MatchEvents'

interface Props {
  matchData: Match
  onChange: () => void
}

export default function MatchNav({ matchData, onChange }: Props) {
  const [activeTab, setActiveTab] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
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
        display={index === activeTab ? 'block' : 'none'}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Equipos" />
          <Tab label="Eventos" />
        </Tabs>
      </Box>
      <TabPanel index={0}>
        <MatchTeams matchData={matchData} onChange={onChange} />
      </TabPanel>
      <TabPanel index={1}>
        <MatchEvents matchData={matchData} onChange={onChange} />
      </TabPanel>
    </Box>
  )
}
