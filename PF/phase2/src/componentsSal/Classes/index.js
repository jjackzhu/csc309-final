import * as React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HistoryIcon from '@mui/icons-material/History';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HistoryTable from "./HistoryTable";
import StudioInfoTable from "./StudioInfoTable";
import {useContext} from "react";
// import NavBar from "../../componentsSal/NavBar"


//code from here
// https://github.com/mui/material-ui/blob/v5.10.16/docs/data/material/getting-started/templates/dashboard/Dashboard.js



const mdTheme = createTheme();

function DashboardContent() {



    // const [open, setOpen] = React.useState(true);
    // const toggleDrawer = () => {
    //     setOpen(!open);
    // };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <NavBar array={['classes', 'edit']} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                    <StudioInfoTable studio_id={1} />
                                </Paper>
                            </Grid>
                            {/*<Grid item xs={12} >*/}
                            {/*    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>*/}
                            {/*        <HistoryTable />*/}
                            {/*    </Paper>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Index() {
    return <DashboardContent/>;
}