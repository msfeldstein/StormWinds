import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Artifacts__factory } from "./contracts";
import deployments from "./deployment";
import getProvider from "./provider";
export default function Conjure() {
  const [currentConjured, setCurrentConjured] = useState(0);
  const [currentAvailable, setCurrentAvailable] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [conjuring, setConjuring] = useState(false);
  useEffect(() => {
    const provider = getProvider();
    const ArtifactsContract = Artifacts__factory.connect(
      deployments.contracts.Artifacts.address,
      provider
    );
    const load = async () => {
      console.log("Do load");
      const currentConjured = await ArtifactsContract.getCurrentConjured();
      const currentAvailability =
        await ArtifactsContract.getCurrentAvailability();
      setCurrentAvailable(currentAvailability.toNumber());
      setCurrentConjured(currentConjured.toNumber());
      setLoaded(true);
    };
    load();
    // ArtifactsContract.on("ArtifactConjured", load);
  }, []);

  async function conjure() {
    setConjuring(true);
    const provider = getProvider() as ethers.providers.JsonRpcProvider;
    const ArtifactsContract = Artifacts__factory.connect(
      deployments.contracts.Artifacts.address,
      provider.getSigner()
    );
    const price = await ArtifactsContract.getCurrentPrice();
    const response = await ArtifactsContract.conjureArtifact({ value: price });
    await response.wait();
    // await new Promise((res) => setTimeout(res, 4000));
    setConjuring(false);
  }
  if (!loaded) {
    return <div>Seeking...</div>;
  }
  const button = conjuring ? (
    <button disabled>Conjuring...</button>
  ) : (
    <button onClick={conjure}>Conjure</button>
  );
  return (
    <div>
      <div>
        {currentAvailable - currentConjured} artifacts currently scattered
        <div>{button}</div>
      </div>
    </div>
  );
}
