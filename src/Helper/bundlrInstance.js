import { WebBundlr } from "@bundlr-network/client";
import { providers } from "ethers";

export default async function bundlrInstance() {
  await window.ethereum.enable();
  const provider = new providers.Web3Provider(window.ethereum);
  await provider._ready();
  const bundlr = new WebBundlr(
    "https://devnet.bundlr.network",
    "matic",
    provider,
    {
      providerUrl: "https://rpc-mumbai.maticvigil.com",
    }
  );
  // const bundlr = new WebBundlr(
  //   "https://devnet.bundlr.network",
  //   "ethereum",
  //   provider,
  //   {
  //     providerUrl: "https://ethereum-goerli.publicnode.com",
  //   }
  // );
  await bundlr.ready();

  return bundlr;
}
