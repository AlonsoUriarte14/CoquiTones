import React, { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import AudioPlayer from 'material-ui-audio-player';
import theme from "../shared/Theme";

export default function SoundPlayer() {



    const src = "https://github.com/AlonsoUriarte14/Proyecto-Coqui-Toolbox/blob/master/Frontend/src/dummyData/coqui.WAV"
    return (
        <ThemeProvider theme={theme}>
            <AudioPlayer
                elevation={1}
                width="100%"
                variation="default"
                spacing={3}
                download={true}
                autoplay={true}
                order="standart"
                preload="auto"
                loop={true}
                src={src}
            />
        </ThemeProvider>
    )
}