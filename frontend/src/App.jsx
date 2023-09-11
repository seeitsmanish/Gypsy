import { useState } from "react";
import "./App.css";
import "./globals.css";
import Home from "./home/page";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default App;
