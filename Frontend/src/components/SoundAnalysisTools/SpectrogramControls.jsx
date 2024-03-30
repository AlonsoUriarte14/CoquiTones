import * as React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FileUpload from '../shared/FileUpload';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; // Import Box component

import StyledSlider from '../shared/StyledSlider';
function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
};




export default function SpectrogramControls({ setAudioFile, type, setType, colorscale, setColorscale, xrange, setXrange, yrange, setYrange }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FileUpload setAudioFile={setAudioFile} />

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
                <Select
                    defaultValue={"heatmap"}
                    value={type}
                    label="Chart Type"
                    onChange={(event) => setType(event.target.value)}
                >
                    <MenuItem value={"mel-spectrogram"}>Mel Spectrogram</MenuItem>
                    <MenuItem value={"basic-spectrogram"}>Contour</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Color Scale</InputLabel>
                <Select
                    defaultValue={"Jet"}
                    value={colorscale}
                    label="Color Scale"
                    onChange={(event) => setColorscale(event.target.value)}
                >
                    <MenuItem value={"YlOrRd"}> YellowOrRed</MenuItem>
                    <MenuItem value={"RdBu"}>RedBlue</MenuItem>
                    <MenuItem value={"Portland"}> Portland</MenuItem>
                    <MenuItem value={"Picnic"}>Picnic</MenuItem>
                    <MenuItem value={"Jet"}> Jet</MenuItem>
                    <MenuItem value={"Hot"}>Hot</MenuItem>
                    <MenuItem value={"Greys"}> Greyscale</MenuItem>
                    <MenuItem value={"Electric"}>Electric</MenuItem>
                    <MenuItem value={"Bluered"}> BlueRed</MenuItem>
                    <MenuItem value={"Blackbody"}>BlackBody</MenuItem>
                </Select>
            </FormControl>

            <Typography gutterBottom >
                Time (s) Range
            </Typography>
            <StyledSlider
                sx={
                    {
                        marginTop: 4
                    }
                }
                defaultValue={[0, 300]}
                value={xrange.map(value => value.toFixed(1))}
                onChange={(event) => setXrange(event.target.value)}
                valueLabelDisplay='on'
                min={0}
                max={300}
            />

            <Typography gutterBottom>
                Frequency (Hz) Range
            </Typography>
            <StyledSlider
                sx={
                    {
                        marginTop: 4
                    }
                }
                defaultValue={[0, 10000]}
                value={yrange.map(value => value.toFixed(1))}
                onChange={(event) => setYrange(event.target.value)}
                valueLabelDisplay='on'
                min={0}
                max={10000}

            />
        </Box>
    );
}
