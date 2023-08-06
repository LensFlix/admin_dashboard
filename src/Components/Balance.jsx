import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getBalance from "../Helper/getBalance";

export const Balance = () => {
  const balance = useSelector((store) => store.balance);
  const dispatch = useDispatch();
  return (
    <>
      <Text fontWeight="bold" fontSize="2xl" color="red">
        {balance ? ` Balance ${balance}` : null}
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
    </>
  );
};
