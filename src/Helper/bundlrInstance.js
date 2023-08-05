import { WebBundlr } from "@bundlr-network/client";
import { providers } from "ethers";

export default async function bundlrInstance() {
  const provider = new providers.Web3Provider(window.ethereum);
  await provider._ready();
  const client = new WebBundlr(
    "https://devnet.bundlr.network",
    "matic",
    provider,
    {
      providerUrl: "https://rpc-mumbai.maticvigil.com",
    }
  );
  await client.ready();
  return client;
}
