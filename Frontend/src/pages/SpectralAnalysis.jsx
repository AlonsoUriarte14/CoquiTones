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
import FileUpload from "../components/shared/FileUpload";
import SoundPlayer from "../components/SoundAnalysisTools/audioPlayer";
import Spectrogram from "../components/SoundAnalysisTools/Spectrogram";
import SpectrogramControls from "../components/SoundAnalysisTools/SpectrogramControls";
const SpectralAnalysis = () => {
    const [rawAudioFile, setRawAudioFile] = useState(null)
    const [data, setData] = useState(null)
    const [type, setType] = useState("heatmapgl")
    const [colorscale, setColorscale] = useState("Jet")
    const [xrange, setXrange] = useState([0, 1200])
    const [yrange, setYrange] = useState([0, 80])

    useEffect(() => {
        console.log("file: ", rawAudioFile)
        readCSVToMatrix(rawAudioFile)
    }, [rawAudioFile])


    function readCSVToMatrix(file) {
        const reader = new FileReader();


        if (file && file["type"] === "text/csv") {
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


                                        <Spectrogram
                                            data={data}
                                            type={type}
                                            colorscale={colorscale}
                                            xrange={xrange}
                                            yrange={yrange}
                                        // width={width}
                                        // height={height}

                                        />

                                        <SoundPlayer src={rawAudioFile} />
                                    </div>
                                }

                            </Paper>
                        </Grid>
                        <Grid xs={12} md={8} lg={9}>
                            <SpectrogramControls
                                setAudioFile={setRawAudioFile}
                                setType={setType}
                                setColorscale={setColorscale}
                                setXrange={setXrange}
                                setYrange={setYrange}
                            />
                        </Grid>
                    </Container >
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default SpectralAnalysis;