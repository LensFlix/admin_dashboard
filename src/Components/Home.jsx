import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import filereaderStream from "filereader-stream";
import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useSelector } from "react-redux";
import bundlrInstance from "../Helper/bundlrInstance";
import lensABI from "../Helper/lensABI.json";
import { Balance } from "./Balance";
import ConnectWallet from "./ConnectWallet";
import Fund from "./Fund";
import NoProfile from "./NoProfile";

const Home = () => {
  const toast = useToast();
  const [video, setVideo] = useState();
  const [id, setId] = useState("");
  const handle = useSelector((state) => state.handle);
  const profileId = useSelector((state) => state.profileId);
  const { account } = useMoralis();

  const { runContractFunction } = useWeb3Contract();
  const TRUE_BYTES = "0x0000000000000000000000000000000000000001";
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
    try {
      const bundlr = await bundlrInstance();

      const stream = await filereaderStream(video);

      const { id } = await bundlr.upload(stream, {
        tags: tags,
      });
      console.log(id);
      setId(id);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
  async function upload() {
    if (licenseType !== null) {
      if (!licenseFeeUnit || licenseFeeUnit === 0) {
        alert("License Fee Unit is required");
        return;
      }
    }
    try {
      const tags = [...Initialtags];
      if (licenseType !== null)
        tags.push({
          ...licenseType,
          value: licenseType.value + "_" + licenseFeeUnit,
        });
      if (category !== null) tags.push(category);
      if (commercialUse !== null) tags.push(commercialUse);
      if (currency !== null) tags.push(currency);
      if (paymentAddress) tags.push(paymentAddress);
      if (derivation) tags.push(derivation);

      console.log(tags);
      const transactionId = await getTransactionId(tags);

      toast({
        title: "Success",
        description: "Content uploaded successfully on Arweave Network",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setTimeout(() => {
        toast({
          title: "waiting",
          description:
            "Approve transaction to upload content to your lens profile",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }, 1000);
      const transactionParameters = [
        profileId,
        `https://arweave.net/${transactionId}`,
        "0x1292E6dF9a4697DAAfDDBD61D5a7545A634af33d",
        TRUE_BYTES,
        "0x17317F96f0C7a845FFe78c60B10aB15789b57Aaa",
        TRUE_BYTES,
      ];

      const transactionOptions = {
        abi: lensABI,
        contractAddress: "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
        functionName: "post",
        params: {
          vars: transactionParameters,
        },
      };
      let { hash } = await runContractFunction({
        params: transactionOptions,
      });
      if (hash) {
        toast({
          title: "Success",
          description: "Content uploaded successfully on your lens profile",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        toast({
          title: "Transaction Hash",
          description: hash,
          variant: "solid",
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {profileId && account ? (
        <Box>
          <Text
            fontSize={{ base: "1.7rem", sm: "2.5rem", md: "3rem" }}
            fontStyle={"italic"}
            fontWeight={"bold"}
            color={"rgb(170,253,37)"}
            textAlign={"center"}
            py={4}
          >
            {handle ? `Welcome ${handle}` : null}
          </Text>
          <Flex
            p={{ md: 5 }}
            h={"content"}
            direction={{ base: "column", md: "row" }}
            justify={{ md: "space-around" }}
            align={{ md: "top" }}
            maxWidth={"1200px"}
            m={"auto"}
          >
            <Flex
              direction={"column"}
              align={"center"}
              gap={2}
              w={{ md: "50%" }}
              border={{ md: "1px solid white" }}
              borderRadius={9}
              p={5}
            >
              <Text
                fontSize={{ base: "1rem", md: "1rem", lg: "1.3rem" }}
                fontStyle={"italic"}
                fontWeight={"bold"}
                color={"green.400"}
                py={2}
              >
                Upload Content to Lens with UDL on Arweave
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
            <Flex
              direction={"column"}
              align={"center"}
              gap={6}
              w={{ md: "40%" }}
            >
              <Fund />
              <Balance />
            </Flex>
          </Flex>
        </Box>
      ) : !profileId && account ? (
        <NoProfile />
      ) : !account ? (
        <ConnectWallet />
      ) : null}
    </>
  );
};

export default Home;
