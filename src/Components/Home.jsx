import { Button, Flex, Input, Select } from "@chakra-ui/react";
import fileReaderStream from "filereader-stream";
import React, { useState } from "react";
import bundlrInstance from "../Helper/bundlrInstance";
const Home = () => {
  const [video, setVideo] = useState();
  const [id, setId] = useState("");

  async function upload() {
    const bundlr = await bundlrInstance();
    const stream = fileReaderStream(video);
    const { data } = await bundlr.uploader.chunkedUploader.uploadData(stream, {
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
    <Flex bg={"gray.300"} direction={"column"} p={5} align={"center"} gap={2}>
      <Input
        type="file"
        onChange={(e) => {
          setVideo(e.target.files[0]);
        }}
        w={"40%"}
        border={"1px solid black"}
      />
      <Button colorScheme="teal" onClick={upload} size={"sm"} w={"40%"}>
        Upload
      </Button>
      {/* <Text>{id}</Text> */}
      <Select w={"40%"} placeholder="Choose Licence" border={"1px solid black"}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
      <Select w={"40%"} placeholder="Add Tags" border={"1px solid black"}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    </Flex>
  );
};

export default Home;
