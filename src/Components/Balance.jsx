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
      px={16}
      gap={5}
    >
      <Text fontWeight="bold" fontSize="2xl" color="green.400">
        {balance ? ` Balance ${balance} MATIC` : null}
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
