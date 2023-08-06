import { ethers } from "ethers";
import bundlrInstance from "./bundlrInstance";
export default async function getBalance(dispatch) {
  const bundlr = await bundlrInstance();
  const atomicBalance = await bundlr.getLoadedBalance();
  const balance = ethers.utils.formatEther(atomicBalance.toString());
  dispatch({
    type: "SET_BALANCE",
    payload: balance,
  });
}
