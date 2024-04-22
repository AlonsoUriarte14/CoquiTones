# -*- coding: utf-8 -*-
import dataiku
import pandas as pd
import numpy as np
from dataiku import pandasutils as pdu
import librosa
import threading

# Read recipe inputs
samples = dataiku.Dataset("Train")
samples_df = samples.get_dataframe()


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


def apply_extract_features(file_paths, results, index):
    """
    Apply the extract_features function to each audio file in a subset of file paths.

    Args:
        file_paths (list): List of file paths.
        results (list): List to store the results.
        index (int): Index of the worker thread.
    """
    print(f"Worker {index + 1} started.")
    for file_path in file_paths:
        results.append("[" + ",".join(map(str, extract_features(file_path))) + "]")
    print(f"Worker {index + 1} finished.")


# Split the file paths into subsets
num_threads = 6
file_paths = samples_df["filename"].tolist()
chunk_size = (len(file_paths) + num_threads - 1) // num_threads
file_path_chunks = [
    file_paths[i : i + chunk_size] for i in range(0, len(file_paths), chunk_size)
]

# Initialize a list to store the results
results = []

# Create and start worker threads
threads = []
for i, file_path_chunk in enumerate(file_path_chunks):
    thread = threading.Thread(
        target=apply_extract_features, args=(file_path_chunk, results, i)
    )
    threads.append(thread)
    thread.start()

# Wait for all threads to complete
for thread in threads:
    thread.join()

# Add the results to the DataFrame
samples_df["spectrogram"] = pd.Series(results)

# Write recipe outputs
SpecData = dataiku.Dataset("Train_prepared")
SpecData.write_with_schema(samples_df)
