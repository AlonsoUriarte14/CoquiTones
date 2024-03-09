import WorkerFactory from "../../services/WorkerFactory";
import generateSpectrogramData from "../../services/generateSpectrogramData";



const AudioContext = window.AudioContext || window.webkitAudioContext
// Create a new audio context,


// General configuration for common settings
const config = {
    /**
     * The resolution of the FFT calculations
     * Higher value means higher resolution decibel domain..
     */
    fftResolution: 4096,
    /**
     * Smoothing value for FFT calculations
     */
    smoothingTimeConstant: 0.1,
    /**
     * The size of processing buffer,
     * determines how often FFT is run
     */
    processorBufferSize: 2048,
}





/**
 * 
 * @param {File} file object of type wav / mp3
 * @returns {Promise<AudioBuffer>} AudioBuffer object
 */
export const loadWavFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function (event) {
            const arrayBuffer = event.target.result;
            try {
                // Create or resume the AudioContext in response to a user gesture
                let audioContext = new AudioContext()
                // Decode the audio data into an AudioBuffer
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                resolve(audioBuffer);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
};


/**
 * 
 * @param {File} file object of type wav / mp3
 * @returns {Promise<number[][]>} spectrogram data
 */
export const handleLoad = async (file) => {
    try {
        // Load waveform data asynchronously
        const waveform = await loadWavFile(file);

        // Process waveform data
        const processed = await processWaveForm(waveform);

        const workerInstance = new WorkerFactory(generateSpectrogramData)
        workerInstance.postMessage(processed)
        // Remap data to a 2D matrix
        console.log("Processed: ", processed)
        let parsed;
        let promise = new Promise((resolve, reject) => {
            workerInstance.onmessage = (event) => {
                parsed = event.data
                console.log("Parsed", parsed)
                resolve(event.data)
            }
        })

        return promise;
    } catch (error) {
        // Handle errors
        console.error(error)
        console.error("Error loading and processing audio:", error);
        throw error;
    }
}

/**
 * @typedef WaveFormData
 * @type {object}
 * @property {Uint8Array[]} channels    FFT Data for each channel
 * @property {number}       stride      Number of data points in a data block
 * @property {number}       rowCount    Number of rows of data
 * @property {number}       maxFreq     Maximum frequency of the data
 * @property {number}       duration    Audio buffer duration in seconds
 */

/**
 * Process a AudioBuffer and create FFT Data for Spectrogram from it.
 * @param   {AudioBuffer}     audioBuffer   AudioBuffer to process into FFT data.
 * @returns {WaveFormData}                  Processed data
 */
export const processWaveForm = async (audioBuffer) => {
    // Create a new OfflineAudioContext with information from the pre-created audioBuffer
    // The OfflineAudioContext can be used to process a audio file as fast as possible.
    // Normal AudioContext would process the file at the speed of playback.
    const offlineCtx = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate)
    // Create a new source, in this case we have a AudioBuffer to create it for, so we create a buffer source
    const source = offlineCtx.createBufferSource()
    // Set the buffer to the audio buffer we are using
    source.buffer = audioBuffer
    // Set source channel count to the audio buffer channel count, if this wasn't set, the source would default to 2 channels.
    source.channelCount = audioBuffer.numberOfChannels

    // We want to create spectrogram for each channel in the buffer, so we need to separate the channels to separate outputs.
    const splitter = offlineCtx.createChannelSplitter(source.channelCount)
    // Create a analyzer node for the full context
    const generalAnalyzer = offlineCtx.createAnalyser()
    generalAnalyzer.fftSize = config.fftResolution
    generalAnalyzer.smoothingTimeConstant = config.smoothingTimeConstant

    // Prepare buffers and analyzers for each channel
    const channelFFtDataBuffers = []
    const channelDbRanges = []
    const analyzers = []
    for (let i = 0; i < source.channelCount; i += 1) {
        channelFFtDataBuffers[i] = new Uint8Array((audioBuffer.length / config.processorBufferSize) * (config.fftResolution / 2))
        // Setup analyzer for this channel
        analyzers[i] = offlineCtx.createAnalyser()
        analyzers[i].smoothingTimeConstant = config.smoothingTimeConstant
        analyzers[i].fftSize = config.fftResolution
        // Connect the created analyzer to a single channel from the splitter
        splitter.connect(analyzers[i], i)
        channelDbRanges.push({
            minDecibels: analyzers[i].minDecibels,
            maxDecibels: analyzers[i].maxDecibels,
        })
    }
    // Script processor is used to process all of the audio data in fftSize sized blocks
    // Script processor is a deprecated API but the replacement APIs have really poor browser support
    offlineCtx.createScriptProcessor = offlineCtx.createScriptProcessor || offlineCtx.createJavaScriptNode
    const processor = offlineCtx.createScriptProcessor(config.processorBufferSize, 1, 1)
    let offset = 0
    processor.onaudioprocess = (ev) => {
        // Run FFT for each channel
        for (let i = 0; i < source.channelCount; i += 1) {
            const freqData = new Uint8Array(channelFFtDataBuffers[i].buffer, offset, analyzers[i].frequencyBinCount)
            analyzers[i].getByteFrequencyData(freqData)
        }
        offset += generalAnalyzer.frequencyBinCount
    }
    // Connect source buffer to correct nodes,
    // source feeds to:
    // splitter, to separate the channels
    // processor, to do the actual processing
    // generalAanalyzer, to get collective information
    source.connect(splitter)
    source.connect(processor)
    processor.connect(offlineCtx.destination)
    source.connect(generalAnalyzer)
    // Start the source, other wise start rendering would not process the source
    source.start(0)

    // Process the audio buffer
    await offlineCtx.startRendering()
    return {
        channels: channelFFtDataBuffers,
        channelDbRanges,
        stride: config.fftResolution / 2,
        tickCount: Math.ceil(audioBuffer.length / config.processorBufferSize),
        maxFreq: offlineCtx.sampleRate / 2, // max freq is always half the sample rate
        duration: audioBuffer.duration,
    }
}



