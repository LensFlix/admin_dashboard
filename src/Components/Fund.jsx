import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import fundBundlr from "../Helper/fundBalance";

const Fund = () => {
  const [amount, setAmount] = useState();
  const dispatch = useDispatch();
  return (
    <Flex gap={3}>
      <Input
        type="text"
        placeholder="Enter Amount to Fund"
        onChange={(e) => setAmount(e.target.value)}
        colorScheme="white"
        _placeholder={{
          color: "white",
        }}
        focusBorderColor="white"
        color="white"
      />
      <Button
        colorScheme="red"
        fontWeight={"bold"}
        fontSize={"1rem"}
        onClick={() => fundBundlr(amount, dispatch)}
      >
        Fund
      </Button>
    </Flex>
  );
};

export default Fund;
