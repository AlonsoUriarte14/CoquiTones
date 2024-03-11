import Plot from 'react-plotly.js';
import React from 'react';





export default function Spectrogram({ xData, yData, zData, type, colorscale, xrange, yrange, currentTime }) {

    // todo calculate zmin and zmax from data
    // 
    // Define label for the vertical line
    const label = {
        text: `Current Time: ${(currentTime).toFixed(2)} s`, // Customize label text as needed
        x: currentTime,
        y: Math.max(...yrange),
        showarrow: true,
        arrowhead: 0,
        ax: 0,
        ay: -30,
    };
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
                    ncontours: 500,

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
                height: 400,
                width: 700,
                xaxis: {
                    title: "Time (s)",
                    range: xrange

                },
                yaxis: {
                    title: "Frequency (Hz)",
                    range: yrange
                },

                annotations: [label]
            }}


        />

    )
}
