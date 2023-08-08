import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getBalance from "../Helper/getBalance";

export const Balance = () => {
  const balance = useSelector((store) => store.balance);
  const dispatch = useDispatch();
  return (
    <Flex
      direction={"column"}
      border={"1px solid white"}
      borderRadius={9}
      p={4}
      px={{ base: 16, md: 10, lg: 16 }}
      gap={5}
    >
      <Text fontWeight="bold" fontSize="1.2rem" color="green.400" p={0}>
        {balance ? ` Balance ${parseFloat(balance).toFixed(6)} MATIC` : null}
      </Text>
      <Button
        colorScheme="red"
        fontWeight="bold"
        fontSize="1rem"
        onClick={() => {
          getBalance(dispatch);
        }}
      >
        Fetch Balance
      </Button>
    </Flex>
  );
};
