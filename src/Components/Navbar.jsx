import { Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "@web3uikit/web3";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import getBalance from "../Helper/getBalance";
import { getProfileId } from "../Helper/getProfileId";
import switchChain from "../Helper/switchChain";
import { client } from "../LensClient/client";
import { autheticate, challenge } from "../LensClient/queries";
const Navbar = () => {
  const { account } = useMoralis();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.accessToken);
  async function signIn() {
    try {
      const challengeInfo = await client.query({
        query: challenge,
        variables: {
          address: account,
        },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );

      const {
        data: {
          authenticate: { accessToken },
        },
      } = await client.mutate({
        mutation: autheticate,
        variables: {
          address: account,
          signature: signature,
        },
      });

      localStorage.setItem("accessToken", accessToken);
      dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const address = localStorage.getItem("address");
    if (accessToken) {
      dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
    }
    if (account && !token && !accessToken) {
      signIn();
    }
    if (account) {
      getProfileId(account, dispatch);
      getBalance(dispatch);
      switchChain();
      dispatch({ type: "SET_ADDRESS", payload: account });
      if (address != account) {
        signIn();
      }
      localStorage.setItem("address", account);
    }
    if (!account) {
      dispatch({ type: "SET_PROFILE_ID", payload: null });
      dispatch({ type: "SET_HANDLE", payload: null });
    }
  }, [account]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      bg="black"
      // color="white"
      py={1}
    >
      <Text
        fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
        color="red"
        fontWeight="bold"
      >
        LensFlix
      </Text>
      <ConnectButton moralisAuth={false} />
    </Flex>
  );
};

export default Navbar;
