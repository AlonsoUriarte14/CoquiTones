# -*- coding: utf-8 -*-
import dataiku
import pandas as pd
import numpy as np
from dataiku import pandasutils as pdu
from dataiku import recipe
import librosa
from concurrent.futures import ThreadPoolExecutor

input_dataset = recipe.get_input(object_type='DATASET')
output_dataset = recipe.get_output(object_type='DATASET')

# Read recipe inputs
samples_df = input_dataset.get_dataframe()


# Define the extract_features function
def extract_features(file_path):
    """
    Extract features from audio file using librosa.

    Args:
        file_path (str): Path to the audio file.

    Returns:
        np.array: Extracted features.
    """
    audio, sr = librosa.load(file_path)
    result = np.array([])

    # MFCC
    mfccs = np.mean(librosa.feature.mfcc(y=audio, sr=sr).T, axis=0)
    result = np.hstack((result, mfccs))

    # Chroma
    stft = np.abs(librosa.stft(audio))
    chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sr).T, axis=0)
    result = np.hstack((result, chroma))

    # Mel-scaled spectrogram
    mel = np.mean(librosa.feature.melspectrogram(y=audio, sr=sr).T, axis=0)
    result = np.hstack((result, mel))

    return result


def main():
    print(samples_df.head())
    print(f"Processing {len(samples_df)} files.")
    with ThreadPoolExecutor() as pool:
        results = pool.map(
            extract_features, samples_df["filename"])

    # Add the results to the DataFrame
    samples_df["spectrogram"] = pd.Series(results)

    # Write recipe outputs
    output_dataset.write_with_schema(samples_df)


if __name__ == '__main__':
    main()
