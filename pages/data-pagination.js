import { Box, Button, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Layout from "../components/Layout";
import { getPassenger } from "../utils/fetchApi";

const List = ({ id, name, trips }) => (
  <Box bg="white" px={10} py={6} rounded={"xl"} shadow="md">
    <HStack justify="space-between">
      <Text color="gray.700" fontSize={12}>
        {id}
      </Text>
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png"
        width="60px"
        height="22px"
        objectFit="contain"
      />
    </HStack>
    <Flex flexDir="column" mt={2}>
      <Text fontSize={18} fontWeight="bold">
        {name}
      </Text>
      <Text fontSize={24} color="gray.700">
        {trips} Trips
      </Text>
    </Flex>
  </Box>
);

const DataPagination = ({ dataPassengers }) => {
  const [page, setpage] = useState(0);
  const { data, isSuccess } = useQuery(
    ["passenger", page],
    () => getPassenger(page),
    {
      refetchInterval: 10000,
      initialData: dataPassengers,
    }
  );

  return (
    <Layout>
      <Text fontSize={24} fontWeight="bold" mt={10}>
        Data Passenger
      </Text>
      {isSuccess && (
        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6} mt={10}>
          {data.data.map((item) => (
            <List
              key={item._id}
              id={item._id}
              name={item.name}
              trips={item.trips}
            />
          ))}
        </SimpleGrid>
      )}
      <HStack mt={10}>
        <Button disabled={page < 1} onClick={() => setpage((prev) => prev - 1)}>
          Prev
        </Button>
        <Button
          disabled={page >= (data?.totalPages ?? 0)}
          onClick={() => setpage((prev) => prev + 1)}
        >
          Next
        </Button>
      </HStack>
    </Layout>
  );
};

export default DataPagination;

export const getStaticProps = async () => {
  const dataPassengers = await getPassenger();
  return {
    props: { dataPassengers },
  };
};
