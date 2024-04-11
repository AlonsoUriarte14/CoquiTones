import numpy as np
import librosa


def extract_featuers(file_path):
    """

    Code provided here: https://blog.dataiku.com/speech-emotion-recognition-deep-learning

    Args:
        file_path

    Returns:
        crazy spectrogram data
    """

    audio, sr = librosa.load(file_path)
    result = np.array([])

    # MFCC
    mfccs = np.mean(librosa.feature.mfcc(y=audio, sr=sr).T, axis=0)
    result = np.hstack((result, mfccs))

    # Chroma
    stft = np.abs(librosa.stft(audio))
    chroma = np.mean(
        librosa.feature.chroma_stft(
            S=stft,
            sr=sr,
        ).T,
        axis=0,
    )
    result = np.hstack((result, chroma))

    # mel
    mel = np.mean(librosa.feature.melspectrogram(audio, sr=sr).T, axis=0)
    result = np.hstack((result, mel))

    return result
