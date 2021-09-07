import React, { useEffect } from "react";
import ActiveStorm from "./ActiveStorm";
import "./App.css";
import Information from "./Information";
import { ethers } from "ethers";
import { Storms__factory } from "./contracts/factories/Storms__factory";
import StormsData from "./deployments.json";

console.log(StormsData.contracts.Storms.address);
function App() {
  useEffect(() => {
    async function effect() {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const StormsContract = Storms__factory.connect(
        StormsData.contracts.Storms.address,
        provider
      );
      const activeStorms = await StormsContract.activeStorms();
      console.log("ActiveStorms", activeStorms);
    }
    effect();
  });
  return (
    <div className="App">
      <div className="Title">Stormwinds</div>
      <ActiveStorm />
      <Information />
    </div>
  );
}

export default App;
