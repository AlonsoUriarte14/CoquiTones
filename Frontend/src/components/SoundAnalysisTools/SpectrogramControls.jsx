import * as React from 'react';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FileUpload from '../shared/FileUpload';
import Paper from '@mui/material/Paper';
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


const PrettoSlider = styled(Slider)({
    color: 'primary',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});





export default function SpectrogramControls({ setAudioFile, setType, setColorscale, setXrange, setYrange }) {


    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "auto",
                }}
            >

                <FileUpload setAudioFile={setAudioFile} />


                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">chartType</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"heatmapgl"}
                        label="ChartType"
                        onChange={(selected) => setType(selected)}
                    >
                        <MenuItem value={"heatmapgl"}> Heatmap</MenuItem>
                        <MenuItem value={"contour"}>contour</MenuItem>

                    </Select>
                </FormControl>


                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">ColorScale</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"RdBu"}
                        label="ColorScale"
                        onChange={(selected) => setColorscale(selected)}
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

                <Typography gutterBottom>
                    X-axis Range
                </Typography>
                <PrettoSlider
                    defaultValue={[0, 14000]}
                    onChange={(range) => setXrange(range)}

                />

                <Typography gutterBottom>
                    Y-axis Range
                </Typography>
                <PrettoSlider
                    defaultValue={[0, 10000]}
                    onChange={(range) => setYrange(range)}

                />
            </Paper >
        </div>
    );
}