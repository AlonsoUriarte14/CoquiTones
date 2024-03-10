import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import theme from "../shared/Theme";
export default function SoundPlayer({ src, setCurrentTime }) {
    const [audioUrl, setAudioUrl] = useState(null);

    useEffect(() => {
        if (src) {

            const audioUrl = URL.createObjectURL(src);
            setAudioUrl(audioUrl);
        }
    }, [src])

    const buttonRef = useRef(null)
    const [play, setPlay] = useState(false)


    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime)
    }

    return (
        <ThemeProvider theme={theme}>


            {audioUrl && (
                <div>
                    <Button
                        ref={buttonRef}
                        onClick={() => setPlay(true)}
                    >

                        Play Sample

                    </Button>


                </div>
            )}

            {
                play && (
                    <audio
                        src={audioUrl}
                        onTimeUpdate={(event) => { handleTimeUpdate(event) }}
                        autoPlay
                        controls
                    />
                )
            }
        </ThemeProvider>
    )
}
