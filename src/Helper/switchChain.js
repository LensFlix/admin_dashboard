import { ethers } from "ethers";

export default async function switchChain() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const chainId = await provider.getNetwork();
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
  // =======================
  // if (chainId != import.meta.VITE_TEST_CHAINID_ETH) {
  //   window.ethereum.request({
  //     method: "wallet_addEthereumChain",
  //     params: [
  //       {
  //         chainId: "0x5",
  //         rpcUrls: ["https://ethereum-goerli.publicnode.com"],
  //         chainName: "Goerli",
  //         nativeCurrency: {
  //           name: "ETH",
  //           symbol: "ETH",
  //           decimals: 18,
  //         },
  //         blockExplorerUrls: ["https://goerli.etherscan.io"],
  //       },
  //     ],
  //   });
  // }
  // =======================
  // if(chainId != import.meta.VITE_CHAINID_BSC) {
  //   window.ethereum.request({
  //     method: "wallet_addEthereumChain",
  //     params: [
  //       {
  //         chainId: "0x38",
  //         rpcUrls: ["https://bsc-dataseed.binance.org"],
  //         chainName: "Binance Smart Chain",
  //         nativeCurrency: {
  //           name: "BNB",
  //           symbol: "BNB",
  //           decimals: 18,
  //         },
  //         blockExplorerUrls: ["https://bscscan.com"],
  //       },
  //     ],
  //   });
  // }
  // =======================
  // if (chainId != import.meta.VITE_CHAINID_POLYGON) {
  //   window.ethereum.request({
  //     method: "wallet_addEthereumChain",
  //     params: [
  //       {
  //         chainId: "0x89",
  //         rpcUrls: ["https://polygon-rpc.com"],
  //         chainName: "Polygon",
  //         nativeCurrency: {
  //           name: "MATIC",
  //           symbol: "MATIC",
  //           decimals: 18,
  //         },
  //         blockExplorerUrls: ["https://polygonscan.com"],
  //       },
  //     ],
  //   });
  // }
}
