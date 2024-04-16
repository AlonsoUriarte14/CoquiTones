import json
import os
import sys
import csv


def import_suffix_map(path: str) -> dict[str, str]:
    with open(path, "r") as f:
        return json.load(f)


def main() -> None:
    # Get the absolute path of the target folder
    target_folder = os.path.abspath(sys.argv[1])

    print(target_folder)
    # Import suffix map
    suffix_map = import_suffix_map(os.path.join(target_folder, "suffixmap.json"))
    species_map = {v: k for k, v in suffix_map.items()}

    files = []

    for filename in os.listdir(target_folder):
        name, ext = os.path.splitext(filename)
        if ext.lower() == ".wav":
            suffix = name[-3:]
            species = species_map.get(suffix)
            if species:
                files.append(
                    {
                        "filename": os.path.join(target_folder, filename),
                        "species": species,
                    }
                )

    with open(
        os.path.join(target_folder, "samples.csv"), "w", newline=""
    ) as output_file:
        keys = files[0].keys() if files else ["filename", "species"]
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(files)


if __name__ == "__main__":
    main()
