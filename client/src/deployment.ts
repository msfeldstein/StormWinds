import LocalhostDeployment from "./deployments-localhost.json";
import TestnetDeployment from "./deployments-testnet.json";

const deployment =
  process.env.NODE_ENV === "production"
    ? TestnetDeployment
    : LocalhostDeployment;

export default deployment;
