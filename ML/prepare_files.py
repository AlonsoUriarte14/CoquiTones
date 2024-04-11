import sys
import os
import itertools
import shutil
import json
import librosa
import soundfile as sf


def suffix_iter():
    def gen():
        for i in itertools.count(start=1):
            yield f"_{i:02d}"

    return gen


def remove_ext(file_name: str) -> tuple[str, str]:
    extension = file_name.split(".")[-1]
    file_name_no_extension = file_name[: -(len(extension) + 1)]
    return extension, file_name_no_extension


def extract_folder_to_dir(from_folder: str, to_folder: str, suffix: str):
    file_names = os.listdir(from_folder)
    for file_name in file_names:
        extension, file_name_no_extension = remove_ext(file_name)
        new_file_name = file_name_no_extension + suffix + "." + extension
        shutil.copy(os.path.join(from_folder, file_name), to_folder)
        shutil.move(
            os.path.join(to_folder, file_name), os.path.join(to_folder, new_file_name)
        )


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


def main() -> None:
    data_dir = sys.argv[1]
    species = os.listdir(data_dir)
    species_map = {folder: suffix for folder, suffix in zip(species, suffix_iter()())}
    for species, suffix in species_map.items():
        folder = os.path.join(data_dir, species)
        extract_folder_to_dir(folder, data_dir, suffix)

    with open(os.path.join(data_dir, "suffixmap.json"), "w") as f:
        json.dump(species_map, f)


if __name__ == "__main__":
    main()
