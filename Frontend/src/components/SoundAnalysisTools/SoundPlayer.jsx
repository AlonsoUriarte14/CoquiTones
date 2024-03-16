import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import theme from "../shared/Theme";

export default function SoundPlayer({ file, setCurrentTime, yrange }) {
    const [playing, setPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [source, setSource] = useState(null)
    const updateSource = (newSource) => {
        setSource(newSource)
    }
    const [audioContext, setAudioContext] = useState(null)
    const audioElementRef = useRef(null);




    useEffect(() => {

        if (file) {
            const url = URL.createObjectURL(file)
            setAudioUrl(url)
        }
    }, [file])

    useEffect(() => {
        function filterAudio() {

            if (source) {
                const centerFrequency = (yrange[0] + yrange[1]) / 2; // Set center frequency
                const qualityFactor = centerFrequency / (yrange[1] - yrange[0])
                const filter = audioContext.createBiquadFilter();
                filter.type = 'bandpass'; // Set filter type to bandpass
                filter.frequency.value = centerFrequency;
                filter.Q.value = qualityFactor; // Set quality factor

                // Connect the nodes: source -> filter -> destination
                source.connect(filter);
                filter.connect(audioContext.destination);

                console.log("Filtered Audio!")
            }

        }

        if (audioUrl && audioElementRef.current) {

            const audioSrc = audioContext.createMediaElementSource(audioElementRef.current);
            updateSource(audioSrc);


            filterAudio()
        }
    }, [yrange, audioUrl])

    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime);
    };


    const handleClick = () => {
        setPlaying(!playing);
        setAudioContext(new (window.AudioContext || window.webkitAudioContext)())
    };

    return (
        <ThemeProvider theme={theme}>
            {audioUrl && <Button
                variant="condensed"
                onClick={() => handleClick()}
            >
                Play Sample
            </Button>}

            <div>

                {playing && <audio
                    src={audioUrl}
                    ref={audioElementRef}
                    onTimeUpdate={handleTimeUpdate}
                    controls
                />}

            </div>

        </ThemeProvider>
    );
}
