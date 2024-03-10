import Plot from 'react-plotly.js';
import React from 'react';





export default function Spectrogram({ xData, yData, zData, type, colorscale, xrange, yrange }) {

    // todo calculate zmin and zmax from data
    // 
    return (
        <Plot
            data={[
                {
                    x: xData,
                    y: yData,
                    z: zData,
                    type: type,
                    colorscale: colorscale,
                    ncontours: 10,

                }
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
        >
        </Plot>
    )
}
