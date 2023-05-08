"use client";

import { useState, useEffect } from "react";

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
  const [source, setSource] = useState("");
  const [lat, setLat] = useState(33);
  const [lon, setLon] = useState(32);

  const getRoutes = async (event) => {
    var raw = JSON.stringify({
      DeparturePosition: sourceCords,
      DestinationPosition: destCords,
      DepartureTime: "2023-05-08T23:47:25.244718",
    });
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/getRoute/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result["routes"][0]["geometry"]["coordinates"];
        const temp = [];
        data.map((routes) => {
          temp.push([routes[1], routes[0]]);
        });
        setTotalRoutes(temp);
        console.log(totalRoutes);
      })
      .catch((error) => console.log("error", error));
  };

  const handleOnSearch = async (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    if(string.length >= 3) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/search/?text=${string}&maxResults=6`
      );
      const data = await response.json();
      console.log(data);
      console.log("page.tsx render");
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
              />

              <Weather lat={lat} lon={lon} />
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

      <Maps className={styles.map} />
    </div>
  );
}
