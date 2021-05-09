import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TopBar from "./Components/TopBar";

export default function App() {
  return (
    <>
      <TopBar />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
        </Box>
      </Container>
    </>
  );
}
