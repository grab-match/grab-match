import json
from elasticsearch import Elasticsearch

# Step 1: Read JSON File
with open('output.json', 'r') as file:
    data = json.load(file)

# Step 2: Connect to Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 9200, 'scheme': 'http'}])

index_name = 'destinations'

# Step 3: Read Elasticsearch Mapping
with open('es-mapping.json', 'r') as file:
    mapping = json.load(file)

# Step 4: Create the index with the mapping if it doesn't exist
if not es.indices.exists(index=index_name):
    es.indices.create(index=index_name, body=mapping)

# Step 5: Upload Data to Elasticsearch
for i, record in enumerate(data):
    # Ensure longitude and latitude are converted to geolocation format
    record['location'] = {
        'lat': float(record.pop('latitude')),
        'lon': float(record.pop('longtitude'))
    }
    
    res = es.index(index=index_name, id=record['cid'], body=record)
    print(res['result'])