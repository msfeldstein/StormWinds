import LocalhostDeployment from "./deployments-localhost.json";
import TestnetDeployment from "./deployments-testnet.json";

const deployment =
  process.env.NODE_ENV === "production"
    ? TestnetDeployment
    : LocalhostDeployment;

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("Deployment", deployment);

export default deployment;
