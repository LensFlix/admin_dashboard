import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import fundBundlr from "../Helper/fundBalance";

const Fund = () => {
  const [amount, setAmount] = useState();
  const dispatch = useDispatch();
  return (
    <Flex gap={3} border={"1px solid white"} borderRadius={9} p={6}>
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
        colorScheme="green"
        fontWeight={"bold"}
        fontSize={"1rem"}
        onClick={() => {
          fundBundlr(amount, dispatch);
          setAmount("");
        }}
      >
        Fund
      </Button>
    </Flex>
  );
};

export default Fund;
