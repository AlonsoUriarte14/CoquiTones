import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import theme from "../shared/Theme";
export default function SoundPlayer({ src, setCurrentTime, yrange }) {
    const [audioUrl, setAudioUrl] = useState(null);

    async function filterFrequencyRange() {

        let url = URL.createObjectURL(src);
        // Fetch the audio file
        console.log(url)
        const response = await fetch(url);

        console.log(" Response: ", response)
        const arrayBuffer = await response.arrayBuffer();


        console.log("Array Buffer ", arrayBuffer)
        // Decode the audio data
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        console.log("audio buffer", audioBuffer)

        // Create an OfflineAudioContext with the same parameters as the original audio buffer
        const offlineContext = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

        // Create a source node and connect it to the OfflineAudioContext
        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(offlineContext.destination);

        // Create a BiquadFilterNode to apply the frequency filter
        const filterNode = offlineContext.createBiquadFilter();
        filterNode.type = 'bandpass'; // Use a bandpass filter to isolate the desired frequency range
        filterNode.frequency.value = (yrange[0] + yrange[1]) / 2; // Set the center frequency of the bandpass filter
        filterNode.Q.value = 1; // Adjust Q factor as needed for desired bandwidth
        filterNode.frequency.setValueAtTime(yrange[0], offlineContext.currentTime);
        filterNode.frequency.setValueAtTime(yrange[1], offlineContext.currentTime + 1); // Apply filter over a 1-second window

        // Connect the source node to the filter node, and the filter node to the OfflineAudioContext destination
        source.connect(filterNode);
        filterNode.connect(offlineContext.destination);

        // Start rendering the OfflineAudioContext
        source.start(0);
        const filteredBuffer = await offlineContext.startRendering();

        console.log("filteredbuffer", filteredBuffer)
        // Create a new Blob from the filtered audio buffer
        const filteredBlob = new Blob([filteredBuffer.getChannelData(0)], { type: 'audio/wav' });

        console.log("filteredblob", filteredBlob)
        // Create a URL for the Blob
        const filteredUrl = URL.createObjectURL(filteredBlob);

        console.log("filteredUrl", filteredUrl)
        return filteredUrl;
    }


    useEffect(() => {
        if (src) {

            const audioUrl = URL.createObjectURL(src);
            setAudioUrl(audioUrl)
        }
    }, [src])

    useEffect(() => {

        if (audioUrl) {
            setAudioUrl(filterFrequencyRange())
        }
    }, [yrange])


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
                        // autoPlay
                        controls
                    />
                )
            }
        </ThemeProvider>
    )
}
