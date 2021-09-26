import React, { useEffect, useState } from "react";
import ActiveStorm from "./ActiveStorm";
import AllStorms from "./AllStorms";
import "./App.css";
import Information from "./Information";
import { Storms__factory } from "./contracts";
import { defaultStatuses, toNamedMap } from "./StormsUtil";
import StormsData from "./deployment";
import ActiveAnimation from "./animation-components/ActiveAnimation";
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
    // StormsContract.on("StormBegins", load);
  }, []);

  const connectedContent = (
    <>
      <Conjure />
      <Trove />
    </>
  );
  const unconnectedContent = <div>Install MetaMask to conjure artifacts</div>;
  const troveContent = window.ethereum ? connectedContent : unconnectedContent;
  return (
    <>
      <div className="App">
        <div className="Title">Stormwinds</div>
        <ActiveStorm storms={storms} />
        <AllStorms storms={storms} />
        {troveContent}
        <Information />
      </div>
      <ActiveAnimation storms={storms} />
    </>
  );
}

export default App;
