import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import theme from "../shared/Theme";

export default function SoundPlayer({ src, setCurrentTime, yrange }) {
    const [playing, setPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [source, setSource] = useState(null)
    const [audioContext, setAudioContext] = useState(new (window.AudioContext || window.webkitAudioContext)())
    const audioElementRef = useRef(null);
    async function filterAudio() {




        const filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass'; // Set filter type to bandpass
        filter.frequency.value = (yrange[0] + yrange[1]) / 2; // Set center frequency
        filter.Q.value = 10; // Set quality factor

        // Connect the nodes: source -> filter -> destination
        source.connect(filter);
        filter.connect(audioContext.destination);


    }

    useEffect(() => {

        if (src) {
            const url = URL.createObjectURL(src)
            setAudioUrl(url)
        }
    }, [src])

    useEffect(() => {

        if (audioUrl && audioElementRef.current) {
            setSource(audioContext.createMediaElementSource(audioElementRef.current));
            filterAudio()
        }
    }, [yrange])

    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime);
    };


    const handleClick = () => {
        setPlaying(!playing);
        if (playing) {
            audioElementRef.current.pause();
        } else {
            if (source) {
                audioElementRef.current.play();
            }
        }
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
