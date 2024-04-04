import React, { useState, useMemo } from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import BarAndNav from "../components/shared/BarAndNav";
import theme from "../components/shared/Theme"
import DataHandler from "../services/DataHandler";
const CDN = () => {

    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    const initDummyDucks = () => {
        const ducks = [
            {
                node_id: 1,
                node_type: "PAPA",
                nlatitude: 18.0814,
                nlongitude: 66.9038,
                ndescription: "Dummy Duck",
                lastHeartbeat: getDate()
            },

            {
                node_id: 2,
                node_type: "MAMA",
                nlatitude: 18.0814,
                nlongitude: 66.9038,
                ndescription: "Dummy Duck",
                lastHeartbeat: getDate()
            },
            {
                node_id: 3,
                node_type: "MAMA",
                nlatitude: 18.0814,
                nlongitude: 66.9038,
                ndescription: "Dummy Duck",
                lastHeartbeat: getDate()
            },
            {
                node_id: 4,
                node_type: "MAMA",
                nlatitude: 18.0814,
                nlongitude: 66.9038,
                ndescription: "Dummy Duck",
                lastHeartbeat: getDate()
            },
        ]

        return ducks;
    }

    const [ducks, setDucks] = useState(initDummyDucks(), [])
    const calcultaCols = () => {
        return Math.ceil(Math.sqrt(ducks.length));
    }
    const numCols = useMemo(() => calcultaCols(), [ducks])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <BarAndNav />
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
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
                        <Grid item xs={8} md={4} lg={5}>
                            <Paper elevation={4}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 150,
                                }}
                            >
                                <Typography variant="h3" color="primary" align="center">
                                    Cluster Duck Network Management
                                </Typography>

                            </Paper >
                        </Grid>
                    </Container >

                    <Container maxWidth sx={{ mt: 10, mb: 10 }}>
                        <Grid container spacing={3}>
                            {ducks.map((duck) => (
                                <Grid item key={duck.node_id} xs={12} md={6} lg={Math.floor(12 / numCols)}>
                                    <Paper elevation={4}
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Duck ID: {duck.node_id}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            Type: {duck.node_type}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Description: {duck.ndescription}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Latitude: {duck.nlatitude}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Longitude: {duck.nlongitude}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Last message: {duck.lastHeartbeat}
                                        </Typography>
                                        <Link href="#" variant="button">
                                            View Details
                                        </Link>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default CDN;