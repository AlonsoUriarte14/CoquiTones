import json
import os
import sys
import csv
import pandas as pd
import concurrent.futures
import functools


def import_suffix_map(path: str) -> dict[str, str]:
    with open(path, "r") as f:
        return json.load(f)


def readAveragesData(path: str):

    data = []
    # Read the CSV file and store the data in a list of dictionaries
    with open(path, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)

    return data


def filterById(averagesData):
    pass


# def main() -> None:
#     target_folder = os.path.abspath(sys.argv[1])
#     suffix_map = import_suffix_map(os.path.join(target_folder, "suffixmap.json"))
#     species_map = {v: k for k, v in suffix_map.items()}

#     files = []

#     for filename in os.listdir(target_folder):
#         name, ext = os.path.splitext(filename)
#         if ext.lower() == ".wav":
#             suffix = name[-3:]
#             species = species_map[suffix]
#             files.append(
#                 {"filename": os.path.join(target_folder, filename), "species": species}
#             )

#     with open(
#         os.path.join(target_folder, "samples.csv"), "w", newline=""
#     ) as output_file:
#         keys = files[0].keys()
#         dict_writer = csv.DictWriter(output_file, keys)
#         dict_writer.writeheader()
#         dict_writer.writerows(files)


def main() -> None:

    data_dir = sys.argv[1]
    averagesData = readAveragesData(
        os.path.join(
            data_dir, "FrequencyRange_by_species_and_site_Averages.csv")
    )

    data = []

    def handle_site_dataset(data_dir):
        folder_path = os.path.join(data_dir, siteDataSet)
        if os.path.isdir(folder_path):
            siteId = int(siteDataSet[4:6])
            SiteData = [item for item in averagesData if int(
                item["SiteID"]) == siteId]

            for file_name in os.listdir(folder_path):
                if file_name.endswith(".wav"):
                    file_path = os.path.abspath(
                        os.path.join(folder_path, file_name))
                    for classification in SiteData:
                        data.append(
                            [
                                file_path,
                                classification["Species"],
                            ]
                        )

    # Iterate through each subfolder
    futures: list[concurrent.futures.Future] = []
    for siteDataSet in os.listdir(data_dir):
        with concurrent.futures.ThreadPoolExecutor() as Pool:
            futures.append(Pool.submit(
                functools.partial(handle_site_dataset, data_dir)))

    for future in futures:
        _ = future.result()

    # Create DataFrame
    df = pd.DataFrame(
        data,
        columns=[
            "filename",
            "species",
        ],
    )

    df.to_csv("./ML/raw_dataset.csv", index=False)


if __name__ == "__main__":
    main()
