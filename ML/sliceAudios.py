import soundfile as sf
import librosa
import os


def split_audio(file_path, outputDir, segmentLengthInSeconds=5):
    # First load the file
    audio, sr = librosa.load(file_path)

    # Get number of samples for segmentLengthInSeconds seconds;
    buffer = segmentLengthInSeconds * sr
    samples_total = len(audio)

    samples_wrote = 0
    counter = 1
    while samples_wrote < samples_total:

        # check if the buffer is not exceeding total samples
        if buffer > (samples_total - samples_wrote):
            buffer = samples_total - samples_wrote

        block = audio[samples_wrote : (samples_wrote + buffer)]

        if not os.path.exists(outputDir):
            os.makedirs(outputDir)

        out_filename = os.path.join(
            outputDir + os.path.sep + "split_" + str(counter) + "_" + "test.wav"
        )

        # Write n second segment
        sf.write(out_filename, block, sr)
        counter += 1
        samples_wrote += buffer


if __name__ == "__main__":

    split_audio(
        "C:/Users/dasus/Documents/clases/FINAL SEMESTER/Capstone Spring 2024/repo/proyecto_coqui/Frontend/src/dummyData/coqui.WAV",
        "Sliced Audios Babyy",
    )
