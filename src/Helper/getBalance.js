import { ethers } from "ethers";
import bundlrInstance from "./bundlrInstance";
export default async function getBalance(dispatch) {
  try {
    const bundlr = await bundlrInstance();
    const atomicBalance = await bundlr.getLoadedBalance();
    console.log(atomicBalance);
    const balance = ethers.utils.formatEther(atomicBalance.toString());
    dispatch({
      type: "SET_BALANCE",
      payload: balance,
    });
  } catch (error) {
    alert(error);
  }
}
