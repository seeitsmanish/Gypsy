from fastapi import FastAPI
from datetime import datetime, time, timedelta
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import json
import boto3
import random
import requests
import networkx as nx



class RouteRequest(BaseModel):
    DeparturePosition: List[float]
    DestinationPosition: List[float]
    DepartureTime: str = datetime.now().isoformat()

OVERPASS_URL = "http://overpass-api.de/api/interpreter"


app = FastAPI()
client = boto3.client('location', region_name='ap-south-1')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def coord_to_id(coord):
    overpass_query = f"""
    [out:json];
    node(around:20, {coord[1]}, {coord[0]});
    out;
    """
    response = requests.get(OVERPASS_URL, params={'data': overpass_query})
    id_ = response.json()["elements"][0]["id"]
    return id_

def id_to_coord(id_):
    overpass_query = f"""
    [out:json];
    node({id_});
    out;
    """
    response = requests.get(OVERPASS_URL, params={'data': overpass_query})
    lat = response.json()["elements"][0]["lat"]
    lon = response.json()["elements"][0]["lon"]
    return [lat, lon] 


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

    return listWithDistDurAndRoutes


@app.post("/api/getRoutes/")
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


@app.post("/api/getSafestPath/")
async def getSafestPath(route: RouteRequest):
    """
    Get Safest Path
    """
    response = requests.get(
            f"http://router.project-osrm.org/route/v1/car/"
            f"{route.DeparturePosition[0]},{route.DeparturePosition[1]};"
            f"{route.DestinationPosition[0]},{route.DestinationPosition[1]}"
            f"?geometries=geojson&alternatives=true&overview=full"
        )

    routes = json.loads(response.content)["routes"]
    optimal_path = routes[0]["geometry"]["coordinates"]

    maxLon, maxLat, minLon, minLat = -181, -91, 181, 91
    for long, lat in optimal_path:
        maxLon, maxLat, minLon, minLat = max(maxLon, long),max(maxLat, lat),min(minLon, long),min(minLat, lat)
    
    # creating bbox
    south, north, west, east = minLat, maxLat, minLon, maxLon
    margin = 0.1
    lat_margin = margin * (maxLat - minLat)
    lon_margin = margin * (maxLon - minLon)

    bbox = f"{south-lat_margin},{west-lon_margin},{north+lat_margin},{east-lon_margin}"
    
    # creating overpass query
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    (
        node({bbox});
        way({bbox});
    );
    out;
    """
    response = requests.get(overpass_url, params={"data": overpass_query})
    graph_data = response.json()

    # creating Graph
    G = nx.Graph()
    for element in graph_data["elements"]:
        if element["type"] == "node":
            G.add_node(element["id"], lat=element["lat"], lon=element["lon"])
        if element["type"] == "way":
            nodes = element["nodes"]
            for i in range(len(nodes)-1):
                G.add_edge(nodes[i], nodes[i+1])
        


    # getting source and destination id
    src_id = coord_to_id(route.DeparturePosition)
    dest_id = coord_to_id(route.DestinationPosition)
    
    # assigning random weights
    for u, v in G.edges:
        G.edges[u,v]['weight'] = random.randint(1, 10)
    
    try:
        safe_path = nx.dijkstra_path(G, src_id, dest_id)
        safe_path_coord = []
        for safe_path_node in safe_path:
            node = G.nodes[safe_path_node]
            safe_path_coord.append([node["lat"], node["lon"]])

        final_path = safe_path_coord
    except Exception as e:
        for l in optimal_path:
            l[:] = reversed(l[:])
        final_path = optimal_path

    bounding_box = [[minLat,minLon],[minLat,maxLon],[maxLat,minLon],[maxLat, maxLon]]

    return {
        "final_path": final_path,
        "bounding_box": bounding_box
    }
