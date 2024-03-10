import Plot from 'react-plotly.js';
import React from 'react';





export default function Spectrogram({ xData, yData, zData, type, colorscale, xrange, yrange, currentTime }) {

    // todo calculate zmin and zmax from data
    // 

    // Create x and y coordinates for the vertical line
    const verticalLineX = [currentTime, currentTime];
    const verticalLineY = [Math.min(...yrange), Math.max(...yrange)];
    return (
        <Plot
            data={[
                {
                    type: type,
                    x: xData,
                    y: yData,
                    z: zData,
                    colorscale: colorscale,
                    connectgaps: true,
                    ncontours: 10,

                },
                {
                    type: "scatter",
                    mode: "lines",
                    x: verticalLineX,
                    y: verticalLineY,
                    line: {
                        color: "red", // Change color as needed
                        width: 1,
                        opacity: 0.7, // Set opacity to 50%
                    },
                },
            ]}

            layout={{
                height: 375,
                width: 700,
                xaxis: {
                    title: "Time (s)",
                    range: xrange

                },
                yaxis: {
                    title: "Frequency (Hz)",
                    range: yrange
                },

            }}
        />

    )
}
