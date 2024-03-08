import React, { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Plot from 'react-plotly.js';

import BarAndNav from "../components/shared/BarAndNav";
import theme from "../components/shared/Theme"
import FileUpload from "../components/shared/FileUpload";
import SoundPlayer from "../components/SoundAnalysisTools/audioPlayer";
const SpectralAnalysis = () => {
    const [rawAudioFile, setRawAudio] = useState(null)
    const [data, setData] = useState(null)


    useEffect(() => {
        console.log("file: ", rawAudioFile)
        readCSVToMatrix(rawAudioFile)
    }, [rawAudioFile])


    function readCSVToMatrix(file) {
        const reader = new FileReader();


        if (file) {
            reader.readAsText(file);
            reader.onload = function (event) {
                const csv = event.target.result;
                const lines = csv.split('\n');
                const matrix = lines.map(line => line.trim().split(','));

                setData(matrix);
                console.log(data)
            };

            reader.onerror = function () {
                console.error('Error reading file');
            };

        }

    }


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


                                <FileUpload setAudioFile={setRawAudio} />


                            </Paper >

                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 400,
                                }}
                            >
                                {data &&
                                    <div>

                                        <Plot
                                            data={[
                                                {
                                                    z: data,
                                                    type: 'heatmapgl',
                                                    colorscale: "RdBu",
                                                    ncontours: 100,
                                                    zmax: 0,
                                                    zmin: -50
                                                }
                                            ]}
                                            layout={{
                                                height: 375,
                                                width: 1100,
                                                title: " Spectrogram Plot",
                                                xaxis: {
                                                    title: "Time "
                                                },
                                                yaxis: {
                                                    title: "Frequency (Hz)"
                                                },

                                                "xaxis.range": [0, 30],
                                                "yaxis.range": [0, 80],

                                            }}
                                        >
                                        </Plot>

                                        <SoundPlayer src={rawAudioFile} />
                                    </div>
                                }

                            </Paper>
                        </Grid>
                    </Container >
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default SpectralAnalysis;