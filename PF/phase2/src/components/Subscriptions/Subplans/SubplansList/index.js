import {useContext, useState} from "react";
import APIContext from "../../Contexts/APIContext";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// template from https://github.com/mui/material-ui/blob/v5.10.16/docs/data/material/getting-started/templates/pricing/Pricing.js
function PricingContent() {
  const { subplans } = useContext(APIContext);
  const { updatePlan, setUpdatePlan, userPlan } = useContext(APIContext);
  var tiers = []

  const [newPlan, setNewPlan] = useState(null)

  //dialogue
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  subplans.map((subplan, index) => (tiers.push(subplan)))

  return (
    <React.Fragment>
      {/* // Dialogue to confirm subscription */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Subscribe to this plan?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be charged immediately if you are not subscribed. If subscribed, your next payment will be updated to this plan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            handleClose() 
            if (userPlan.sub_plan === newPlan){
              alert("Already subscribed to this plan")
            }else{
              setUpdatePlan({id: newPlan})}
            }} 
            autoFocus>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Header */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Availabe Subscriptions
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Subscribe to gain access to unlimited classes!
        </Typography>
      </Container>
      {/* End Header */}

      {/* //subplan container */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.name}
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.name}
                  subheader={tier.month_duration === 1 ? "Pay monthly" : "Pay every " + tier.month_duration + " months"}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth 
                  variant="contained" 
                  id={tier.id} 
                  onClick={() => { 
                    setNewPlan(tier.id)
                    handleClickOpen()
                    
                  }}>
                    Subscribe
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}