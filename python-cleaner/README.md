# GrabMatch - Data Processing and Uploading Repository

## Overview

This repository contains scripts for cleaning data and uploading it to Elasticsearch. The scripts utilize popular data processing libraries to ensure efficient and effective data handling.

## Tech Stack

- **[Elasticsearch](https://pypi.org/project/elasticsearch/)**: Used for storing and searching large volumes of data.
- **[Pandas](https://pypi.org/project/pandas/)**: Utilized for data manipulation and analysis.
- **JSON**: Employed for data interchange format.
- **[NumPy](https://pypi.org/project/numpy/)**: Provides support for large multi-dimensional arrays and matrices.

## Scripts

### 1. `clean.py`
- **Purpose**: Cleans and preprocesses raw data.
- **Functionality**: Uses Pandas and NumPy to handle data cleaning tasks such as removing null values, normalizing data, and converting data types.

### 2. `uploader.py`
- **Purpose**: Uploads cleaned data to Elasticsearch.
- **Functionality**: Converts cleaned data to JSON format and uploads it to an Elasticsearch index.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/grab-match/scraper-cleaner.git
    cd data-processing-repo
    ```

2. **Create a virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

## Usage

### Cleaning Data
1. **Run the `clean.py` script:**
    ```bash
    python clean.py
    ```
    - Replace `input.json` with the path to your raw data file.
    - The cleaned data will be saved to `output.json`.

### Uploading Data to Elasticsearch
1. **Ensure Elasticsearch is running and accessible.**

2. **Run the `uploader.py` script:**
    ```bash
    python uploader.py
    ```
    - Replace `output.json` with the path to your cleaned data file.
    - Replace `index_name` with the name of the Elasticsearch index where the data will be uploaded.