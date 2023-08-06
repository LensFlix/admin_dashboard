import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import bundlrInstance from "../Helper/bundlrInstance";
import readFileAsBuffer from "../Helper/readFileAsBuffer";
const Home = () => {
  const [video, setVideo] = useState();
  const [id, setId] = useState("");
  const handle = useSelector((state) => state.handle);

  async function upload() {
    const { bundlr, Buffer } = await bundlrInstance();
    const stream = await readFileAsBuffer(video);
    const { data } = await bundlr.upload(Buffer.from(stream), {
      tags: [
        { name: "Content-Type", value: "video/mp4" },
        { name: "app-name", value: "LensFlix" },
      ],
    });
    console.log(data.id);
    setId(data.id);
    return data.id;
  }
  console.log(video);
  return (
    <Flex
      bg={"gray.900"}
      direction={"column"}
      p={5}
      align={"center"}
      gap={2}
      minH={"100vh"}
    >
      <Text
        fontSize={"3rem"}
        fontStyle={"italic"}
        fontWeight={"bold"}
        color={"red"}
        my={5}
      >
        {handle ? `Welcome ${handle}` : null}
      </Text>
      <Input
        type="file"
        onChange={(e) => {
          setVideo(e.target.files[0]);
        }}
        w={"40%"}
        border={"1px solid gray"}
        color={"gray"}
        _hover={{ border: "1px solid white" }}
      />
      {/* <Text>{id}</Text> */}
      <Select
        color={"white"}
        w={"40%"}
        placeholder="Choose Licence"
        // border={"1px solid black"}
        border={"1px solid gray"}
        _hover={{ border: "1px solid white" }}
        focusBorderColor="none"
        borderRadius={6}
        style={{ color: "gray" }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
      <Select
        color={"white"}
        w={"40%"}
        placeholder="Add Tags"
        border={"1px solid gray"}
        _hover={{ border: "1px solid white" }}
        focusBorderColor="none"
        borderRadius={6}
        style={{ color: "gray" }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
      <Button
        colorScheme="red"
        fontWeight={"bold"}
        fontSize={"1rem"}
        onClick={upload}
        size={"md"}
        w={"40%"}
      >
        Upload
      </Button>
    </Flex>
  );
};

export default Home;
