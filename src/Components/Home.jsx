import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import filereaderStream from "filereader-stream";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import bundlrInstance from "../Helper/bundlrInstance";
import { Balance } from "./Balance";
import ConnectWallet from "./ConnectWallet";
import Fund from "./Fund";
import NoProfile from "./NoProfile";
const Home = () => {
  const [video, setVideo] = useState();
  const [id, setId] = useState("");
  const handle = useSelector((state) => state.handle);
  const profileId = useSelector((state) => state.profileId);
  const account = useMoralis();
  const Initialtags = [
    { name: "Content-Type", value: "video/mp4" },
    { name: "app-name", value: "LensFlix" },
    { name: "License", value: "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8" },
  ];

  const [category, setCategory] = useState();
  const [licenseType, setLicenseType] = useState();
  const [licenseFeeUnit, setLicenseFeeUnit] = useState();
  const [commercialUse, setCommercialUse] = useState();
  const [currency, setCurrency] = useState();
  const [paymentAddress, setPaymentAddress] = useState();
  const [derivation, setDerivation] = useState();

  async function getTransactionId(tags) {
    const bundlr = await bundlrInstance();

    const stream = await filereaderStream(video);

    const { data } = await bundlr.upload(stream, {
      tags: tags,
    });
    console.log(data.id);
    setId(data.id);
    return data.id;
  }

  async function upload() {
    if (licenseType !== null) {
      if (!licenseFeeUnit || licenseFeeUnit === 0) {
        alert("License Fee Unit is required");
        return;
      }
    }
    const tags = [...Initialtags];
    if (licenseType !== null)
      tags.push({
        ...licenseType,
        value: licenseType.value + "_" + licenseFeeUnit,
      });

    if (commercialUse !== null) tags.push(commercialUse);
    if (currency !== null) tags.push(currency);
    if (paymentAddress) tags.push(paymentAddress);
    if (derivation) tags.push(derivation);

    console.log(tags);
    const transactionId = await getTransactionId(tags);
  }
  return (
    <>
      {profileId && account ? (
        <Box>
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
            p={5}
            h={"content"}
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
                placeholder="Add Category"
                border={"1px solid gray"}
                _hover={{ border: "1px solid white" }}
                focusBorderColor="none"
                borderRadius={6}
                style={{ color: "gray" }}
                name="category"
                onChange={(e) => {
                  setCategory({ name: e.target.name, value: e.target.value });
                }}
              >
                <option value="movie">movie</option>
                <option value="series">series</option>
              </Select>
              <Select
                color={"white"}
                placeholder="License-Fee"
                name="License-Fee"
                onChange={(e) => {
                  setLicenseType({
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
                border={"1px solid gray"}
                _hover={{ border: "1px solid white" }}
                focusBorderColor="none"
                borderRadius={6}
                style={{ color: "gray" }}
              >
                <option value="None">None</option>
                <option value="One-Time">One-Time</option>
                <option value="Monthly">Monthly</option>
              </Select>

              <Input
                type="text"
                placeholder="License_Fee Unit"
                onChange={(e) => {
                  setLicenseFeeUnit(Number(e.target.value));
                }}
                border={"1px solid gray"}
                color={"gray"}
                _hover={{ border: "1px solid white" }}
              />

              <Select
                color={"white"}
                placeholder="Commercial-Use"
                name="Commercial-Use"
                border={"1px solid gray"}
                _hover={{ border: "1px solid white" }}
                focusBorderColor="none"
                borderRadius={6}
                style={{ color: "gray" }}
                onChange={(e) => {
                  setCommercialUse({
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
              >
                <option value="None">None</option>
                <option value="Allowed">Allowed</option>
                <option value="Allowed-With-Credit">Allowed-With-Credit</option>
              </Select>

              <Select
                color={"white"}
                placeholder="Currency"
                name="Currency"
                border={"1px solid gray"}
                _hover={{ border: "1px solid white" }}
                focusBorderColor="none"
                borderRadius={6}
                style={{ color: "gray" }}
                onChange={(e) => {
                  setCurrency({
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
              >
                <option value="U">U</option>
                <option value="AR">AR</option>
                <option value="MATIC">MATIC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
              </Select>

              <Input
                type="text"
                placeholder="Payment-Address"
                name="Payment-Address"
                onChange={(e) => {
                  setPaymentAddress({
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
                border={"1px solid gray"}
                color={"gray"}
                _hover={{ border: "1px solid white" }}
              />
              <Select
                color={"white"}
                placeholder="Derivation"
                name="Derivation"
                border={"1px solid gray"}
                _hover={{ border: "1px solid white" }}
                focusBorderColor="none"
                borderRadius={6}
                style={{ color: "gray" }}
                onChange={(e) => {
                  setDerivation({
                    name: e.target.name,
                    value: e.target.value,
                  });
                }}
              >
                <option value="None">None</option>
                <option value="Allowed-With-Credit">Allowed-With-Credit</option>
                <option value="Allowed-With-Indication">
                  Allowed-With-Indication
                </option>
                <option value="Allowed-With-License-PassThrough">
                  Allowed-With-License-PassThrough
                </option>
                <option value="Allowed-With-RevenueShare-25%">
                  Allowed-With-RevenueShare-25%
                </option>
                <option value="Allowed-With-RevenueShare-50%">
                  Allowed-With-RevenueShare-50%
                </option>
                <option value="Allowed-With-RevenueShare-75%">
                  Allowed-With-RevenueShare-75%
                </option>
                <option value="Allowed-With-RevenueShare-100%">
                  Allowed-With-RevenueShare-100%
                </option>
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
        </Box>
      ) : !profileId && window.onloadeddata ? (
        <NoProfile />
      ) : account ? (
        <ConnectWallet />
      ) : null}
    </>
  );
};

export default Home;
