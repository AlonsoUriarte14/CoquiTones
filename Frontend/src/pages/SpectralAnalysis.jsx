import React from "react";
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
import FileUpload from "../components/shared/FileUpload";
const SpectralAnalysis = () => {

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
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Typography variant="h3" color="primary" align="center">
                                    Spectral Analysis
                                </Typography>

                                <FileUpload />
                            </Paper >
                        </Grid>
                    </Container >
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default SpectralAnalysis;