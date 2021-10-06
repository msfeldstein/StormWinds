import TestnetDeployment from "./deployments-testnet.json";

import LocalStorms from './deployments/localhost/Storms.json'
import LocalArtifacts from "./deployments/localhost/Artifacts.json"

const LocalhostDeployment = {
  "name": "localhost",
  "chainId": "1337",
  "contracts": {
    Artifacts: LocalArtifacts,
    Storms: LocalStorms
  }
}

const deployment =
  process.env.NODE_ENV === "production"
    ? TestnetDeployment
    : LocalhostDeployment;

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("Deployment", deployment);

let prefix = "";
if (deployment.name === "ropsten") prefix = "ropsten.";
if (deployment.name === "rinkeby") prefix = "rinkeby.";
export const etherscan = `https://${prefix}etherscan.io/address/${deployment.contracts.Storms.address}`;
export default deployment;
