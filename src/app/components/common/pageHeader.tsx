import { Box, Container, Stack, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

function PageHeader({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 4,
        pb: 2,
      }}
    >
      <Container maxWidth='sm'>
        <Typography
          component='h1'
          variant='h3'
          align='center'
          color='text.primary'
          gutterBottom
        >
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  );
}

export default PageHeader;
