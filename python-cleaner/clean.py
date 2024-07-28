# based on this json please clean the data with the following rules:
# - remove all duplicated data based on cid
import pandas as pd
import json
import numpy as np

# Load data
df = pd.read_json('input.json', dtype={'cid': str})

# Print the number of rows
print(len(df))

# Drop duplicates
df = df.drop_duplicates(subset='cid')

# Function to convert open_hours to a simpler format
def simplify_open_hours(open_hours):
    if isinstance(open_hours, dict):
        return {day: hours[0] for day, hours in open_hours.items() if hours}
    return open_hours

# Apply the conversion to the 'open_hours' column
df['open_hours'] = df['open_hours'].apply(simplify_open_hours)

# Function to convert a single time range to 24-hour format
def convert_time_range_to_24_hour(time_range):
    if time_range.lower() == "closed":
        return "Closed"
    try:
        open_time, close_time = time_range.split('–')
        open_time_24 = open_time
        if len(open_time) > 6:
            open_time_24 = pd.to_datetime(open_time.strip(), format='%I.%M %p').strftime('%H:%M')

        close_time_24 = close_time
        if len(close_time) > 6:
            close_time_24 = pd.to_datetime(close_time.strip(), format='%I.%M %p').strftime('%H:%M')

        return f"{open_time_24}–{close_time_24}"
    except ValueError:
        # Handle already 24-hour format or other unexpected formats
        return time_range

# Function to convert open_hours to 24-hour format
def convert_open_hours_to_24_hour(open_hours):
    if isinstance(open_hours, dict):
        return {day: convert_time_range_to_24_hour(hours) for day, hours in open_hours.items()}
    return open_hours

# Apply the conversion to the 'open_hours' column
df['open_hours'] = df['open_hours'].apply(convert_open_hours_to_24_hour)

# Convert DataFrame to a list of dictionaries
data = df.replace({np.nan: None}).to_dict(orient='records')

# Remove where 'category' is contained 'agency'
data = [record for record in data if 'agency' not in record.get('category', '')]

# Remove where 'categories' is contained 'Travel agency'
data = [record for record in data if 'Travel agency' not in record.get('categories', [])]

# Set open_hours to 'Open 24 hours' if it is an empty dictionary in 'City park' categories
for record in data:
    if 'City park' in record.get('categories', []) and record.get('open_hours') == {}:
        record['open_hours'] = {
            "Friday": "Open 24 hours",
            "Monday": "Open 24 hours",
            "Saturday": "Open 24 hours",
            "Sunday": "Open 24 hours",
            "Thursday": "Open 24 hours",
            "Tuesday": "Open 24 hours",
            "Wednesday": "Open 24 hours"
        }

# Replace empty dictionaries with None
for record in data:
    for key, value in record.items():
        if value == {}:
            record[key] = None
        elif value == "":
            record[key] = None
        elif value == []:
            record[key] = None

# Save data with proper encoding
with open('output.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

# Print the number of rows
print(len(df))

# Print the first 5 rows
print(df.head())