import React, { useEffect, useState } from "react";
import ActiveStorm from "./ActiveStorm";
import AllStorms from "./AllStorms";
import "./App.css";
import Information from "./Information";
import { Storms__factory } from "./contracts";
import { defaultStatuses, toNamedMap } from "./StormsUtil";
import StormsData from "./deployment";
import { ethers } from "ethers";
import ActiveAnimation from "./animation-components/ActiveAnimation";
import AllAnimations from "./animation-components/AllAnimations";

function App() {
  const [storms, setStorms] = useState(defaultStatuses());
  useEffect(() => {
    async function effect() {
      const hexChainId = "0x" + parseInt(StormsData.chainId).toString(16);
      let provider: ethers.providers.Provider;
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
        provider = new ethers.providers.JsonRpcProvider();
      }
      const StormsContract = Storms__factory.connect(
        StormsData.contracts.Storms.address,
        provider
      );
      const activeStorms = await StormsContract.activeStorms();
      const namedStorms = toNamedMap(activeStorms);
      setStorms(namedStorms);
    }
    effect();
  }, []);
  if (false) {
    return <AllAnimations />;
  }
  return (
    <>
      <div className="App">
        <div className="Title">Stormwinds</div>
        <ActiveStorm storms={storms} />
        <AllStorms storms={storms} />
        <Information />
      </div>
      <ActiveAnimation storms={storms} />
    </>
  );
}

export default App;
