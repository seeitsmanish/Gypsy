from fastapi import FastAPI
from datetime import datetime, time, timedelta
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import json
import boto3
import random
import requests



class RouteRequest(BaseModel):
    DeparturePosition: List[float]
    DestinationPosition: List[float]
    DepartureTime: str = datetime.now().isoformat()


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = boto3.client('location', region_name='ap-south-1')


@app.get("/api/search/")
async def search(text: str, maxResults: int=5):
    """
    Autocompletion Support
    """
    response = client.search_place_index_for_text(
        IndexName="GypsyPlaceIndex",
        Text=text,
        MaxResults=maxResults
    )

    return response

    # uncomment for using openstreetmaps api
    # response = requests.get(f"https://nominatim.openstreetmap.org/search.php?q={text}&format=jsonv2&limit={maxResults}")
    # return json.loads(response.content)


@app.post("/api/getRoute/")
async def getRoute(route: RouteRequest):
    """
    Get the Route Info Based on src and dest (in Lat & Long)
    """
    def random_bit(p):
        if random.random() < p:
            return 1
        else:
            return 0

    response = requests.get(
        f"http://router.project-osrm.org/route/v1/car/"
        f"{route.DeparturePosition[0]},{route.DeparturePosition[1]};"
        f"{route.DestinationPosition[0]},{route.DestinationPosition[1]}"
        f"?geometries=geojson&alternatives=true&overview=full"
    )
    
    routes = json.loads(response.content)["routes"]
    # print(routes)
    
    listWithDistDurAndRoutes = []
    res = []
    for route in routes:
        ls = route["geometry"]["coordinates"]
        for l in ls:
            l[:] = reversed(l[:])
        res.append(ls)
        Place = {}
        Place['distance'] = route['legs'][0]['distance']
        Place['duration'] =  route['legs'][0]['duration']
        Place['route'] = ls

        listWithDistDurAndRoutes.append(Place)

    
    listWithDistDurAndRoutes

    return listWithDistDurAndRoutes


@app.post("/api/getRoutes")
async def getRoutes(route: RouteRequest):
    """
    Get multiple routes for different times.
    """
    todays_date = datetime.today() + timedelta(days=1)
    times = [
        time(hour=1, minute=00, second=00), 
        time(hour=9, minute=00, second=00), 
        time(hour=12, minute=00, second=00),
        time(hour=17, minute=15, second=00) 
    ]

    diff_times = [datetime.combine(todays_date, time_) for time_ in times]
    responses = []

    for time_ in diff_times:
        route.DepartureTime = time_.isoformat()
        response = client.calculate_route(
            CalculatorName='GypsyRouteCalculator',
            DepartureTime=route.DepartureTime,
            DeparturePosition=route.DeparturePosition,
            DestinationPosition=route.DestinationPosition
        )

        responses.append(response)
    
    return {
        "data": responses
    }