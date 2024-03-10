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

import BarAndNav from "../components/shared/BarAndNav";
import theme from "../components/shared/Theme"
import SoundPlayer from "../components/SoundAnalysisTools/audioPlayer";
import Spectrogram from "../components/SoundAnalysisTools/Spectrogram";
import SpectrogramControls from "../components/SoundAnalysisTools/SpectrogramControls";
import { handleLoad } from "../components/SoundAnalysisTools/SpectrogramDataReader"
const SpectralAnalysis = () => {
    const [rawAudioFile, setRawAudioFile] = useState(null)
    const updateRawAudioFile = (newAudioFile) => {
        setRawAudioFile(newAudioFile)
    }
    const [xData, setXData] = useState(null)
    const [yData, setYData] = useState(null)
    const [zData, setZData] = useState(null)
    const updateData = (newData) => {
        setZData(newData)
    }
    const [type, setType] = useState("heatmapgl")
    const updateType = (newType) => {
        setType(newType)
    }
    const [colorscale, setColorscale] = useState("Jet")
    const updateColorscale = (newColor) => {
        setColorscale(newColor)
    }
    const [xrange, setXrange] = useState([])
    const updateXrange = (newXrange) => {
        setXrange(newXrange)
    }
    const [yrange, setYrange] = useState([])

    const updateYrange = (newYrange) => {
        setYrange(newYrange)
    }


    useEffect(() => {

        const getData = async () => {
            if (rawAudioFile) {

                const data = await handleLoad(rawAudioFile)
                console.log("Data", data)
                setXData(data['x'])
                setYData(data['y'])
                setZData(data['z'])
            }
        }

        getData()
        // readCSVToMatrix(rawAudioFile)
    }, [rawAudioFile])

    function readCSVToMatrix(file) {
        const reader = new FileReader();

        if (file && file["type"] === "text/csv") {
            reader.readAsText(file);
            reader.onload = function (event) {
                const csv = event.target.result;
                const lines = csv.split('\n');
                const matrix = lines.map(line => line.trim().split(','));

                setZData(matrix);
                console.log("Data", matrix)
            };

            reader.onerror = function () {
                console.error('Error reading file');
            };
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
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
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h3" color="primary" align="center">
                                        Spectral Analysis
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <Paper sx={{ p: 2, height: 400 }}>
                                    {zData &&
                                        <Spectrogram
                                            xData={xData}
                                            yData={yData}
                                            zData={zData}
                                            type={type}
                                            colorscale={colorscale}
                                            xrange={xrange}
                                            yrange={yrange}
                                        />
                                    }
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper sx={{ p: 2, height: 400 }}>
                                    <SpectrogramControls
                                        setAudioFile={updateRawAudioFile}
                                        type={type}
                                        setType={updateType}
                                        colorscale={colorscale}
                                        setColorscale={updateColorscale}
                                        xrange={xrange}
                                        setXrange={updateXrange}
                                        yrange={yrange}
                                        setYrange={updateYrange}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <Paper
                                    sx={{ p: 2, height: 'auto' }}
                                >
                                    <SoundPlayer src={rawAudioFile} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    )
}

export default SpectralAnalysis;
