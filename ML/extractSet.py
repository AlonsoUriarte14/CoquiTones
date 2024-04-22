import os
import zipfile
import sys

"""
Script for extracting data from https://figshare.com/articles/dataset/Sounds_of_the_Eleutherodactylus_frog_community_from_Puerto_Rico/806302?file=3104183
Unzips all the zips from root
Simply Unzip downloaded file and provide path root of folder
"""


def extract_zip_files(zip_folder, extract_to):
    """
    Extracts all zip files from a folder to a specified directory.

    Args:
        zip_folder (str): Path to the folder containing zip files.
        extract_to (str): Path to the directory where zip files will be extracted.
    """
    # Make sure the extraction directory exists
    os.makedirs(extract_to, exist_ok=True)

    # Extract all zip files in the folder
    for item in os.listdir(zip_folder):
        if item.endswith(".zip"):
            file_path = os.path.join(zip_folder, item)
            with zipfile.ZipFile(file_path, "r") as zip_ref:
                zip_ref.extractall(extract_to)
                print(f"{item} extracted to {extract_to}")


if __name__ == "__main__":

    zip_folder = sys.argv[1]
    extract_zip_files(zip_folder, zip_folder)
