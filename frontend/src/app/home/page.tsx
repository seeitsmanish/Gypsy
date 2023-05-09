"use client";

import React, { useState , useEffect} from "react";

import {
  Box,
  Stack,
  Card,
  Text,
  CardBody,
  Button,
  ButtonGroup,
  Tabs,
  TabList,
  Tab,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Weather from "../../../components/Weather";
import Maps from "../../../components/Maps";

import Image from "next/image";
import logo from "./Logo.png";
import styles from "./page.module.css";



export default function Home() {
 
  const [items, setItems] = useState([{}]);
  // const [source, setSource] = useState("");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [sourceCords , setSourceCords] = useState([32.4832324,33.324234]);
  const [destCords , setDestCords] = useState([32.532352,33.234342]);
  const [totalRoutes , setTotalRoutes] = useState([[28.675538 , 77.316325]]);

  // useEffect(() => {
  //   console.log();
  // }, [lat])

  const getRoutes = async () => {
      
    // console.log(src,dest);
    try {
      const routes = await fetch(`http://127.0.0.1:8000/api/getRoute`, {
      method: "POST",
      body: JSON.stringify({
        "DeparturePosition": sourceCords,
        "DestinationPosition": destCords,
        "DepartureTime": '2023-05-08T23:23:20.735Z',
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const data = await routes.json();
    const route = data.routes[0].geometry.coordinates;
    for(let coordinateIndex = 0; coordinateIndex < route.length; coordinateIndex++) {
      route[coordinateIndex] = route[coordinateIndex].reverse();
    }
    console.log(destCords);
    setTotalRoutes(route);
    // return route;
    } catch (error) {
      console.log(error);
    }  
  };

  // const handleChangeSource = async (event) => {
  //   setSource(event.target.value);
  //   if (event.target.value.length >= 3) {
  //     setSuggestions([]);
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/api/search/?text=${event.target.value}&maxResults=5`
  //     );
  //     const data = await response.json();
  //     setSourceCords(data["Results"][0]["Place"]["Geometry"]["Point"]);
  //     // setSuggestions(response);
  //     data.Results.forEach((result) => {
  //       suggestions.push(result.Place.Label);
  //     });
  //   }
  //   // console.log(suggestions);
  //   console.log(sourceCords);
  // };

  // const handleChangeDest = async (event) => {
  //   setDest(event.target.value);
  //   if (event.target.value.length >= 3) {
  //     setSuggestions([]);
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/api/search/?text=${event.target.value}&maxResults=5`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     setDestCords(data["Results"][0]["Place"]["Geometry"]["Point"]);
  //     data.Results.forEach((result) => {
  //       suggestions.push(result.Place.label);
  //     });
  //     // getRoutes(event);
  //   }
  //   // console.log(suggestions);
  //   console.log(destCords);
  // };

  const handleOnSearch = async (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    if(string.length >= 3) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/search/?text=${string}&maxResults=5`
      );
      const data = await response.json();
      // console.log(data);
      // console.log("pasge.tsx render");
      const newList = [];
      for (let resultIndex = 0; resultIndex < data.length; resultIndex++) {
        newList.push({
          id: resultIndex,
          name: data[resultIndex].display_name,
          lat: data[resultIndex].lat,
          lon: data[resultIndex].lon,
        });
      }
      setItems(newList);
    }
  };

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span>{item.name}</span>
      </>
    );
  };
  const setInput = (value) => {
    setLat(value.lat);
    setLon(value.lon);
    setSourceCords([value.lon , value.lat]);
  };
  const setOutput = (value) => {
    setDestCords([value.lon , value.lat]);
    getRoutes();
  }

  return (
    <div>
      <div className={styles.sidebar}>
        <div className={styles.center}>
          <Image src={logo} alt="Logo" height={200} width={200} />
        </div>

        <div className={styles.niet_hackathon}>
          <Text fontSize="xs">NIET HACKATHON PREVIEW</Text>
        </div>
        <div className={styles.main_content}>
          <Stack spacing={2}>
            <Tabs
              className={styles.spacing}
              size="sm"
              variant="soft-rounded"
              colorScheme="blue"
            >
              <TabList>
                <Tab _selected={{ color: "white", bg: "blue.600" }}>Car</Tab>
                <Tab _selected={{ color: "white", bg: "blue.600" }}>
                  Two Wheeler
                </Tab>
                <Tab _selected={{ color: "white", bg: "blue.600" }}>Foot</Tab>
              </TabList>
            </Tabs>

            <Stack spacing={2}>
              {/* For Search AutoComplete */}

              <ReactSearchAutocomplete
                className={styles.search_input}
                items={items}
                onSearch={handleOnSearch}
                formatResult={formatResult}
                onSelect={setInput}
              />

              <ReactSearchAutocomplete
                className={styles.pointer}
                items={items}
                onSearch={handleOnSearch}
                formatResult={formatResult}
                onSelect={setOutput}
              />

              {/* <Weather lat={lat} lon={lon} /> */}
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Text className={styles.spacing}>
              <span>Distance: </span>
              <span className="cl-blue bold">1.9 KM</span>
            </Text>

            <Text>
              <span>Duration: </span>
              <span className="cl-blue bold">20 Minutes</span>
            </Text>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            align="center"
            className={styles.spacing}
          >
            <Button colorScheme="blue" className={styles.spacing}>
              Safety Mode
            </Button>
            <Text fontSize="xs">Recommended</Text>
          </Stack>

          <ButtonGroup className="padding-vertical">
            <Button colorScheme="blue" variant="outline" size="sm">
              Shortest Path
            </Button>
            <Button colorScheme="blue" variant="outline" size="sm">
              Shortest Time
            </Button>
          </ButtonGroup>

          <Card>
            <CardBody>
              <Accordion defaultIndex={[0]} allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Fuel
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    The average fuel consumption is lower than usual.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Suggested Stops
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text>
                      <ul>
                        <li>NIET Greater Noida</li>
                        <li>Pandey's Home (Arcade Gaming)</li>
                        <li>IILM College Greater Noida</li>
                      </ul>
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Road Conditions
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Route between IILM College and NIET College is very good. No
                    traffic is to be expected. Drive faster than normal to reach
                    in optimal time.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </div>
      </div>

      <Maps  totalRoutes={totalRoutes} className={styles.map} />
    </div>
  );
}
