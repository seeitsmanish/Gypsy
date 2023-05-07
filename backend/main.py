from fastapi import FastAPI
import boto3


app = FastAPI()
client = boto3.client('location', region_name='ap-south-1')


@app.get("/api/search/")
async def search(text: str, maxResults: int = 5):
    """
    Autocompletion Support
    """
    response = client.search_place_index_for_text(
        IndexName='GypsyPlaceIndex',
        Text=text,
        MaxResults=maxResults
    )

    return response

