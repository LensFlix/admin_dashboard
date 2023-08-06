import { BigNumber } from "ethers";
import bundlrInstance from "./bundlrInstance";

export default async function fundBundlr(amount) {
  if (!amount) return;

  const bundlr = await bundlrInstance();
  const convertedBalance =
    BigNumber.from(amount) * bundlr.currencyConfig.base[1];
  console.log(convertedBalance);
}
