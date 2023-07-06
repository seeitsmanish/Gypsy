"use client";

import React, { useState } from "react";

import {
  Box,
  Stack,
  Card,
  Text,
  CardBody,
  Button,
  Tabs,
  TabList,
  Tab,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
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
  const [sourceName , setSourceName] = useState('');
  const [destName , setDestName] = useState('');
  const [sourceCords, setSourceCords] = useState([77.490468,28.462547]);
  const [destCords, setDestCords] = useState([77.498598,28.456148]);
  const [totalRoutes, setTotalRoutes] = useState([[28.675538, 77.316325]]);
  const [loading , setLoading] = useState(false);
  const [distance , setDistance] = useState(0.00);
  const [time , setTime] = useState('');
  const [safeRoutes, setSafeRoutes] = useState([[]]);

  // useEffect(() => {
  //   console.log();
  // }, [lat])

  const getRoutes = async () => {
    try {
      setLoading(true);
      const routes = await fetch(`http://127.0.0.1:8000/api/getRoute`, {
        method: "POST",
        body: JSON.stringify({
          DeparturePosition: sourceCords,
          DestinationPosition: destCords,
          DepartureTime: `${new Date()}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await routes.json();
      console.log(data);
      let cor = [];
      for (let cordinates of data) {
        cor.push(cordinates.route);
      }
      setSafeRoutes(cor);

      console.log(totalRoutes);
      // setTotalRoutes(data[0].route);
      var dist = data[0].distance;
      dist = (dist / 1000).toFixed(1);
      var seconds = data[0].duration;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      if (hours === 0) {
        setTime(`${minutes} mins`);
      } else {
        setTime(`${hours}hrs ${minutes}mins`);
      }
      setDistance(dist);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  


  const handleOnSearch = async (string) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    if (string.length >= 2) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/search/?text=${string}&maxResults=3`
      );
      const data = await response.json();
      const newList = [];
      for (
        let resultIndex = 0;
        resultIndex < data.Results.length;
        resultIndex++
      ) {
        newList.push({
          id: resultIndex,
          name: data.Results[resultIndex].Place.Label,
          lat: data.Results[resultIndex].Place.Geometry.Point[1],
          lon: data.Results[resultIndex].Place.Geometry.Point[0],
        });
      }
      setItems(newList);
    }
  };

  const getSafeRoute = async (event) => {
    try {
      setLoading(true);
      const routes = await fetch("http://127.0.0.1:8000/api/getSafestPath", {
        method: "POST",
        body: JSON.stringify({
          DeparturePosition: sourceCords,
          DestinationPosition: destCords,
          DepartureTime: "2023-05-09T08:01:55.178Z",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      });
      const data = await routes.json();
      console.log(data);
      setSafeRoutes(data);
      // var dist = data[0].distance;
      // dist = (dist / 1000).toFixed(1);
      // var seconds = data[0].duration;
      // const hours = Math.floor(seconds / 3600);
      // const minutes = Math.floor((seconds % 3600) / 60);
      // if(hours === 0) {
      //   setTime(`${minutes} mins`)
      // }
      // else{
      //   setTime(`${hours}hrs ${minutes}mins`)
      // }
      // setDistance(dist);
      setLoading(false);
      // return route;
    } catch (error) {
      console.log(error);
    }
  };

  const formatResult = (item) => {
    return (
      <>
        <span>{item.name}</span>
      </>
    );
  };
  const setInput = (value) => {
    setSourceCords([value.lon, value.lat]);
    setSourceName(value.name);
  };
  const setOutput = (value) => {
    setDestCords([value.lon, value.lat]);
    setDestName(value.name);
  };

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

              <Weather lat={sourceCords[1]} lon={sourceCords[0]} />
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Text className={styles.spacing}>
              <span>Distance: </span>
              <span className="cl-blue bold">{`${distance} Km`}</span>
            </Text>

            <Text>
              <span>Duration: </span>
              <span className="cl-blue bold">{`${time}`}</span>
            </Text>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            align="baseline"
            className={styles.spacing}
          >
            <Button colorScheme="blue" className={styles.spacing} onClick = {getSafeRoute}>
              Safety Route
            </Button>
            <Button colorScheme="blue" variant="outline" onClick={getRoutes}>
              Search Route
            </Button>
          </Stack>

          <Card className={styles.spacing}>
            <CardBody>
              <Accordion defaultIndex={[0]}>
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
      {
        loading ? <Spinner
        thickness='8px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        className={styles.spinner}
      /> :
      
      <Maps
        totalRoutes={totalRoutes}
        safeRoutes={safeRoutes} 
        source={[sourceCords[1], sourceCords[0]]}
        destination={[destCords[1], destCords[0]]}
        sourceName = {sourceName}
        destName = {destName}
        className={styles.map}
      />}
    </div>
  );
}
