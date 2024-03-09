import Plot from 'react-plotly.js';
import React from 'react';





export default function Spectrogram({ data, type, colorscale, xrange, yrange }) {

    // todo calculate zmin and zmax from data
    // 
    return (
        <Plot
            data={[
                {
                    z: data,
                    type: type,
                    colorscale: colorscale,
                    ncontours: 10,
                    // zmax: 0,
                    // zmin: -50
                }
            ]}
            layout={{
                height: 375,
                width: 700,
                title: " Spectrogram Plot",
                xaxis: {
                    title: "Time (ms)",
                    range: xrange
                },
                yaxis: {
                    title: "Frequency (Hz)",
                    range: yrange
                },

            }}
        >
        </Plot>
    )
}
