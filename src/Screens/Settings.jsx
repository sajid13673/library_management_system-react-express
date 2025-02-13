import React from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Box,
} from '@mui/material';

export default function SettingsScreen() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Divider />
      
      {/* Profile Settings */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Profile Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              label="Name"
              fullWidth
              variant="outlined"
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              label="Email"
              fullWidth
              variant="outlined"
              defaultValue=""
            />
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
      
      {/* Account Settings */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Update Password
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
      </Container>
  );
}