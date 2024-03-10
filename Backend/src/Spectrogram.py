import json
import numpy as np
import pandas as pd
import librosa


def sendSpectrogram(file):
    # this is the number of samples in a window per fft
    n_fft = 2048
    # The amount of samples we are shifting after each fft
    hop_length = 512

    signal, sampleRate = librosa.load(file)
    mel_signal = librosa.feature.melspectrogram(
        y=signal, sr=sampleRate, hop_length=hop_length, n_fft=n_fft, n_mels=90
    )

    spectrogram = np.abs(mel_signal)
    power_to_db = librosa.power_to_db(spectrogram, ref=np.max)

    mel = power_to_db.tolist()
    x_coords = None
    y_coords = None
    x_coords = librosa.display.__mesh_coords(
        "time", x_coords, power_to_db.shape[1]
    ).tolist()
    y_coords = librosa.display.__mesh_coords(
        "mel", y_coords, power_to_db.shape[0]
    ).tolist()

    output = {"x": x_coords, "y": y_coords, "z": mel}
    return json.dumps(output)
