import React, { useEffect, useState } from "react";
import ActiveStorm from "./ActiveStorm";
import AllStorms from "./AllStorms";
import "./App.css";
import Information from "./Information";
import { Storms__factory } from "./contracts";
import { defaultStatuses, toNamedMap } from "./StormsUtil";
import StormsData from "./deployments.json";
import { ethers } from "ethers";
import SandAnimation from "./animation-components/Sand";
import IceAnimation from "./animation-components/Ice";

function App() {
  const [storms, setStorms] = useState(defaultStatuses());
  useEffect(() => {
    async function effect() {
      let provider: ethers.providers.Provider;
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        provider = new ethers.providers.Web3Provider(window.ethereum);
      } else {
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
  return (
    <>
      <div className="App">
        <div className="Title">Stormwinds</div>
        <ActiveStorm storms={storms} />
        <AllStorms storms={storms} />
        <Information />
      </div>
      {/* <SandAnimation /> */}
      <IceAnimation />
    </>
  );
}

export default App;
