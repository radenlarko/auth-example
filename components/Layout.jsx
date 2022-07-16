import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box bg="gray.50" minH="100vh" pt="60px">
        <Box maxW="1024px" mx="auto" p={2}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
