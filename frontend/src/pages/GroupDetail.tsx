import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const GroupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1" gutterBottom>
              Group Name
            </Typography>
            <Button
              variant="contained"
              color="primary"
            >
              Add Expense
            </Button>
          </Box>
        </Grid>

        {/* Group Balance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Group Balance
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Total Group Balance"
                  secondary="$0.00"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Your Balance"
                  secondary="$0.00"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Members */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Members
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="No members yet"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Expenses */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Expenses
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="No expenses yet"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GroupDetail;
