import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const ConnectWallet = () => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      gap={5}
      py={"100px"}
      h={"content"}
    >
      <Text fontSize={"2rem"} color={"red"} fontWeight={"bold"}>
        Please Connect to Metamask Wallet
      </Text>
    </Flex>
  );
};

export default ConnectWallet;
