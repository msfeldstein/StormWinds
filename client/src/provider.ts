import { ethers } from "ethers";
import StormsData from "./deployment";

let provider: ethers.providers.JsonRpcProvider | null = null;

export default function getProvider(): ethers.providers.JsonRpcProvider {
  if (!provider) {
    const hexChainId = "0x" + parseInt(StormsData.chainId).toString(16);
    console.log("Hex chain id", hexChainId);
    // @ts-ignore
    if (window.ethereum && window.ethereum.chainId === hexChainId) {
      console.log("Connecting to metamask");
      // @ts-ignore
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      console.log(
        "No appropriate ethereum provider for chainId ",
        hexChainId,
        // @ts-ignore
        window.ethereum,
        // @ts-ignore
        window.ethereum && window.ethereum.chainId
      );
      if (StormsData.name === "localhost") {
        provider = new ethers.providers.JsonRpcProvider();
      } else {
        provider = ethers.getDefaultProvider(
          StormsData.name
        ) as ethers.providers.JsonRpcProvider;
        console.log("Finding provider for ", StormsData.name, provider);
      }
      console.log("Using provider", provider);
    }
  }
  return provider;
}
