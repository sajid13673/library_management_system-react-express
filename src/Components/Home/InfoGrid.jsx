import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function RowAndColumnSpacing() {
  return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={4}>
          <Item>1</Item>
        </Grid>
        <Grid xs={4}>
          <Item>2</Item>
        </Grid>
        <Grid xs={4}>
          <Item>3</Item>
        </Grid>
      </Grid>
  );
}