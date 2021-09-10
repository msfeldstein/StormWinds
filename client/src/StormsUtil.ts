import StormsData from "./deployments.json";
import { ethers } from "ethers";
import { Storms__factory } from "./contracts";

const names = ["fire", "sand", "ice", "wind", "lightning"];
export type StormName = "fire" | "sand" | "ice" | "wind" | "lightning";

export enum StormStatus {
  LOADING,
  INACTIVE,
  ACTIVE,
}

export type StormStatuses = {
  fire: StormStatus;
  sand: StormStatus;
  ice: StormStatus;
  wind: StormStatus;
  lightning: StormStatus;
};

export function toNamedMap(fromContract: Array<boolean>): StormStatuses {
  const obj: { [key: string]: StormStatus } = {};
  names.forEach(
    (name, i) =>
      (obj[name] = fromContract[i] ? StormStatus.ACTIVE : StormStatus.INACTIVE)
  );
  obj.lightning = StormStatus.ACTIVE;
  return obj as StormStatuses;
}

export function defaultStatuses(): StormStatuses {
  return {
    fire: StormStatus.LOADING,
    sand: StormStatus.LOADING,
    ice: StormStatus.LOADING,
    wind: StormStatus.LOADING,
    lightning: StormStatus.LOADING,
  };
}

export async function activate(name: StormName) {
  console.log("Activate ", name);
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const StormsContract = Storms__factory.connect(
    StormsData.contracts.Storms.address,
    provider
  );
  const signer = provider.getSigner();
  const authed = StormsContract.connect(signer);
  await authed.activate(
    names.indexOf(name),
    Math.floor(Date.now() / 1000) + 1000
  );
}
