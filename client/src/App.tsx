import React, { useEffect, useState } from "react";
import ActiveStorm from "./ActiveStorm";
import AllStorms from "./AllStorms";
import "./App.css";
import Information from "./Information";
import { Storms, Storms__factory } from "./contracts";
import { defaultStatuses, toNamedMap } from "./StormsUtil";
import StormsData from "./deployment";
import { ethers } from "ethers";
import ActiveAnimation from "./animation-components/ActiveAnimation";
import AllAnimations from "./animation-components/AllAnimations";
import Conjure from "./Conjure";
import getProvider from "./provider";
import Trove from "./Trove";

function App() {
  const [storms, setStorms] = useState(defaultStatuses());
  useEffect(() => {
    const provider = getProvider();
    const StormsContract = Storms__factory.connect(
      StormsData.contracts.Storms.address,
      provider
    );
    async function load() {
      const activeStorms = await StormsContract.activeStorms();
      const namedStorms = toNamedMap(activeStorms);
      setStorms(namedStorms);
    }
    load();
    StormsContract.on("StormBegins", load);
  }, []);
  const svg =
    "data:image/svg+xml;base64," +
    btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: monospace; font-weight: bold; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">Giants Ice Plate</text></svg>`
    );
  return (
    <>
      <div className="App">
        <div className="Title">Stormwinds</div>
        <ActiveStorm storms={storms} />
        <div>
          <img style={{ width: 300, height: 300 }} src={svg}></img>
        </div>
        <AllStorms storms={storms} />
        <Conjure />
        <Trove />
        <Information />
      </div>
      <ActiveAnimation storms={storms} />
    </>
  );
}

export default App;
