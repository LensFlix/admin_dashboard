import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

const NoProfile = () => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      gap={5}
      py={"100px"}
      h={"content"}
    >
      <Text fontSize={"2rem"} color={"red"} fontWeight={"bold"}>
        No Profile Found in your wallet
      </Text>
      <Link href="https://lens.xyz">Get your profile here!</Link>
    </Flex>
  );
};

export default NoProfile;
