import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import theme from "../shared/Theme";
import { Button } from "@mui/material";

export default function SoundPlayer({ src, }) {
    const [audioUrl, setAudioUrl] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [loaded, setLoaded] = useState(false)
    const buttonRef = useRef(null)
    const [sampleRate, setSampleRate] = useState(null);
    const [samples, setSamples] = useState(null);



    const loadWavFile = (file) => {
        if (!loaded) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const arrayBuffer = event.target.result;
                new AudioContext().decodeAudioData(arrayBuffer)
                    .then(audioBuffer => {
                        const sampleRate = audioBuffer.sampleRate;
                        const samples = audioBuffer.getChannelData(0); // Assuming mono audio
                        const audioUrl = URL.createObjectURL(src);
                        setAudioUrl(audioUrl);
                        setSampleRate(sampleRate);
                        setSamples(samples);

                        console.log("Sample Rate: ", sampleRate)
                        console.log("Samples : ", samples)
                    })
                    .catch(error => alert('Error decoding audio data:' + error));
            };
            reader.readAsArrayBuffer(file)

            setLoaded(true)
        }


    }


    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime)
    }

    return (
        <ThemeProvider theme={theme}>
            <Button
                ref={buttonRef}
                onClick={() => loadWavFile(src)}
            >

                Play Sample

            </Button>

            {audioUrl && (
                <div>

                    <audio
                        src={audioUrl}
                        onTimeUpdate={(event) => { handleTimeUpdate(event) }}
                        autoPlay
                        controls
                    />
                    <p> Current time {currentTime} </p>
                </div>
            )}
        </ThemeProvider>
    )
}
