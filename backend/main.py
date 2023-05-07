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


@app.get("/api/getRoute/")
async def search(
    srcLat: float,
    srcLong: float,
    destLat: float,
    destLong: float
):
    """
    Get the Route Info Based on src and dest (in Lat & Long)
    """
    response = client.calculate_route(
        CalculatorName='GypsyRouteCalculator',
        DeparturePosition=[
            srcLong,
            srcLat
        ],
        DestinationPosition=[
            destLong,
            destLat
        ]
    )

    return response
