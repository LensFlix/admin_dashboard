import { ethers } from "ethers";

export default async function switchChain() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const chainId = await provider.getNetwork();
  console.log(chainId);
  if (chainId != import.meta.VITE_TEST_CHAINID) {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x13881",
          rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
          chainName: "Mumbai",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://mumbai.polygonscan.com"],
        },
      ],
    });
  }
}
