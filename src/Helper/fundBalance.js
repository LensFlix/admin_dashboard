import bundlrInstance from "./bundlrInstance";
import getBalance from "./getBalance";

export default async function fundBundlr(amount, dispatch) {
  console.log(amount);
  try {
    if (!amount) return;

    const bundlr = await bundlrInstance();
    const convertedBalance = amount * 1e18;
    // BigNumber.from(amount) * bundlr.currencyConfig.base[1];
    await bundlr.fund(convertedBalance);
    await getBalance(dispatch);
  } catch (error) {
    console.log(error);
  }
}
