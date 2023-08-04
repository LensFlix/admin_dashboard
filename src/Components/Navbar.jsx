import { Button, Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "@web3uikit/web3";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import { client } from "../LensClient/client";
import { autheticate, challenge } from "../LensClient/queries";
const Navbar = () => {
  const { account } = useMoralis();
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
          authenticate: { accessToken, refreshToken },
        },
      } = await client.mutate({
        mutation: autheticate,
        variables: {
          address: account,
          signature: signature,
        },
      });

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="black"
      color="white"
      padding="1rem"
    >
      <Text fontSize="xl" color="red.500" fontWeight="bold">
        LensFlix
      </Text>
      <ConnectButton moralisAuth={false} />
      {account ? <Button onClick={signIn}>Lens SingIn</Button> : null}
    </Flex>
  );
};

export default Navbar;
