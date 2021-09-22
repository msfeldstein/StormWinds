import React, { useEffect, useState } from "react";
import { Artifacts__factory } from "./contracts";
import getProvider from "./provider";
import deployments from "./deployment";

export default function Trove() {
  const [trove, setTrove] = useState<Array<string>>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const provider = getProvider();
    console.log("Provider", provider);
    const ArtifactsContract = Artifacts__factory.connect(
      deployments.contracts.Artifacts.address,
      provider
    );

    const load = async () => {
      // @ts-ignore
      await window.ethereum.enable();
      // @ts-ignore
      console.log("Asking for trove", window.ethereum.selectedAddress);
      const tokenIds = await ArtifactsContract.troveFor(
        // @ts-ignore
        window.ethereum.selectedAddress
      );
      console.log("Asked for trove");
      const artifacts = [];
      for (var i = 0; i < tokenIds.length; i++) {
        const tokenURI = await ArtifactsContract.tokenURI(tokenIds[i]);
        artifacts.push(tokenURI);
      }
      artifacts.reverse();
      setTrove(artifacts);
      setLoaded(true);
    };
    load();
    ArtifactsContract.on("ArtifactConjured", load);
  }, []);

  if (!loaded) return null;
  return (
    <div>
      {trove.map((data) => {
        console.log(data);
        const b64 = data.split("data:application/json;base64,")[1];
        const json = JSON.parse(atob(b64));
        return (
          <img
            className="artifact-view"
            key={json.name}
            src={json.image}
            alt={json.name}
          />
        );
      })}
    </div>
  );
}
