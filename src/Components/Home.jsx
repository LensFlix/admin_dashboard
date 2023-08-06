import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import filereaderStream from "filereader-stream";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bundlrInstance from "../Helper/bundlrInstance";
import { Balance } from "./Balance";
import Fund from "./Fund";
const Home = () => {
  const [video, setVideo] = useState();
  const [id, setId] = useState("");
  const handle = useSelector((state) => state.handle);
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();
  async function upload() {
    const bundlr = await bundlrInstance();

    const stream = await filereaderStream(video);
    const { data } = await bundlr.upload(stream, {
      tags: [
        { name: "Content-Type", value: "video/mp4" },
        { name: "app-name", value: "LensFlix" },
      ],
    });
    console.log(data.id);
    setId(data.id);
    return data.id;
  }

  return (
    <>
      <Text
        fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
        fontStyle={"italic"}
        fontWeight={"bold"}
        color={"red"}
        textAlign={"center"}
      >
        {handle ? `Welcome ${handle}` : null}
      </Text>
      <Flex
        bg={"gray.900"}
        p={5}
        h={"80vh"}
        direction={{ base: "column", md: "row" }}
        justify={{ md: "space-around" }}
        align={{ md: "top" }}
      >
        <Flex direction={"column"} align={"center"} gap={2}>
          <Text
            fontSize={{ base: "1.5rem", sm: "2rem" }}
            fontStyle={"italic"}
            fontWeight={"bold"}
            color={"red"}
          >
            Upload Content
          </Text>
          <Input
            type="file"
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
            border={"1px solid gray"}
            color={"gray"}
            _hover={{ border: "1px solid white" }}
          />
          {/* <Text>{id}</Text> */}
          <Select
            color={"white"}
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
            w={"100%"}
          >
            Upload
          </Button>
        </Flex>
        <Flex direction={"column"} align={"center"} mt={5} gap={4}>
          <Fund />
          <Balance />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
