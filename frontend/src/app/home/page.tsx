"use client";

import { useState, useEffect } from "react";

import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Card,
  Text,
  CardBody,
  Input,
  InputLeftAddon,
  InputGroup,
  InputLeftElement,
  Button,
  ButtonGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

// import { CUIAutoComplete } from "chakra-ui-autocomplete";

// For Search ReactSearchAutocomplete
import { ReactSearchAutocomplete } from 'react-search-autocomplete'



import FeatherIcon from "feather-icons-react";
import Maps from "../../../components/Maps";

import Image from "next/image";
import logo from "./Logo.png";
import map from "./map.png";
import styles from "./page.module.css";

export default function Home() {
  const [source, setSource] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dest, setDest] = useState("");
  let [suggestions, setSuggestions] = useState(["NIET", "GNIOT", "IILM"]);
  
  // const handleInputChange = (event) => {
  //   const inputValue = event.target.value;
  //   setSource(inputValue);
  //   // fetch suggestions based on input value and update suggestions state
  //   setSuggestions(["suggestion 1", "suggestion 2", "suggestion 3"]);
  //   setIsOpen(true);
  // };

  // const handleMenuItemClick = () => {
  //   setSuggestions("nIET");
  //   setIsOpen(false);
  // };

  // const handleChangeSource = async (event) => {
  //   setSource(event.target.value);
  //     if (event.target.value.length >= 3) {
  //       // setSuggestions([]);
  //       const response = await fetch(`http://127.0.0.1:8000/api/search/?text=${event.target.value}&maxResults=5`);
  //       const data = await response.json();
  //       // setSuggestions(response);
  //       // data.Results.forEach((result) => {
  //       //   suggestions.push(result.Place.Label);
  //       // });
  //       const newList = [];
  //       // console.log(data);
        
  //       for(let resultIndex = 0; resultIndex < data.Results.length; resultIndex++){
  //         newList.push(data.Results[resultIndex].Place.Label);
  //       }
  //       console.log(newList);
  //       setSuggestions(newList);
  //     }
  //     // console.log(suggestions);
  // };

  // const handleChangeDest = (event) => {
  //   setDest(event.target.value);
  //   console.log(dest);
  // };

  const [items, setItems] = useState([{}]);

  const handleOnSearch = async (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.

    const response = await fetch(`http://127.0.0.1:8000/api/search/?text=${string}&maxResults=5`);
    const data = await response.json();
    const newList = [];
    for(let resultIndex = 0; resultIndex < data.Results.length; resultIndex++){
      newList.push({
        id: resultIndex,
        name : data.Results[resultIndex].Place.Label
      });
    }
    setItems(newList);
    console.log(newList);
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
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
              <div className={styles.inputGrp}>
                <FeatherIcon icon="arrow-up-right" />

                {/* For Search AutoComplete */}
                <div className="App">
                  <header className="App-header">
                    <div style={{ width: 400 }}>
                      <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                      />
                    </div>
                  </header>
                </div>

              </div>

              <div className={styles.inputGrp}>
                <FeatherIcon icon="arrow-down" />

              </div>
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
            <Button colorScheme="blue">Safety Mode</Button>
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
              <Accordion defaultIndex={[2]} allowToggle>
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

      {/* <Image
        className={styles.map}
        src={map}
        width={"100vw"}
        height={"100vh"}
        alt="Map"
      /> */}

      <Maps className={styles.map} />
    </div>
  );
}