import React, { useRef } from "react";
import { Box, Button, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useInfiniteQuery } from "react-query";
import Layout from "../components/Layout";
import { getPassengerInfinite } from "../utils/fetchApi";

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

const DataLoadmore = ({ dataPassengers }) => {
  const nextPageData = useRef(0);
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["passengers"], getPassengerInfinite, {
      getNextPageParam: (lastPage) => {
        const newNext = nextPageData.current + 1;
        nextPageData.current = newNext;
        return newNext;
      },
      initialData: { pageParams: undefined, pages: [dataPassengers] },
    });

  return (
    <Layout>
      <Text fontSize={24} fontWeight="bold" mt={10}>
        Data Passenger
      </Text>
      {isSuccess && (
        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6} mt={10}>
          {data.pages.map((page, idx) => (
            <React.Fragment key={idx}>
              {page.data.map((item) => (
                <List
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  trips={item.trips}
                />
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      )}
      <Box mt={10}>
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={fetchNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Box>
    </Layout>
  );
};

export default DataLoadmore;

export const getStaticProps = async () => {
  const dataPassengers = await getPassengerInfinite({ pageParam: 0 });
  return {
    props: { dataPassengers },
  };
};
