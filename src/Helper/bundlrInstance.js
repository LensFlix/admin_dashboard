import { WebBundlr } from "@bundlr-network/client";
import { Buffer } from "buffer-browserify";
import { providers } from "ethers";

export default async function bundlrInstance() {
  await window.ethereum.enable();
  // const accounts = await window.ethereum.request({
  //   method: "eth_requestAccounts",
  // });
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
  // if (typeof Buffer !== "undefined") {
  await bundlr.ready();
  // }
  return { bundlr, Buffer };
}
