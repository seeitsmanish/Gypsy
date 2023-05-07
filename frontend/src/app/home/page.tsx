"use client";

import { useState, useEffect } from "react";

import {
  Box,
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
} from "@chakra-ui/react";
import FeatherIcon from "feather-icons-react";

import Image from "next/image";
import logo from "./Logo.png";
import map from "./map.png";
import styles from "./page.module.css";

export default function Home() {
  const [minimised, setMinimised] = useState(false);

  function handleMinimise() {
    setMinimised(!minimised);
  }

  return (
    <div>
      <div className={minimised ? styles.minimised : styles.container}>
        <div className={styles.center}>
          <Image src={logo} alt="Logo" height={200} width={200} />
        </div>

        <div className={styles.niet_hackathon}>
          <Text fontSize="xs">NIET HACKATHON PREWIEW</Text>
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
            <InputGroup>
              <InputLeftAddon
                children={<FeatherIcon icon="arrow-up-right" />}
              />
              <Input
                type="tel"
                className={styles.input_bg}
                placeholder="Source"
                _placeholder={{ color: "#A0AEC0" }}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children={<FeatherIcon icon="arrow-down" />} />
              <Input
                className={styles.input_bg}
                type="tel"
                placeholder="Destination"
                _placeholder={{ color: "#A0AEC0" }}
              />
            </InputGroup>
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
                    The average fuel is fucked bro.
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
                        <li>GB Road (Strip Club)</li>
                        <li>Pandey's Home (Arcade Gaming)</li>
                        <li>NIET College</li>
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Facere omnis nesciunt provident, p
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>

          <button className={styles.minimise_btn} onClick={handleMinimise}>
            <FeatherIcon icon="chevrons-up" />
          </button>
        </div>
      </div>

      <Image
        className={styles.map}
        src={map}
        width={"100vw"}
        height={"100vh"}
        alt="Map"
      />
    </div>
  );
}
