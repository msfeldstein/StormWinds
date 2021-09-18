import { StormStatus, StormStatuses } from "../StormsUtil";
import FireAnimation from "./Fire";
import IceAnimation from "./Ice";
import LightningAnimation from "./Lightning";
import SandAnimation from "./Sand";

export default function ActiveAnimation({ storms }: { storms: StormStatuses }) {
  if (storms.fire === StormStatus.ACTIVE) {
    return <FireAnimation />;
  }
  if (storms.ice === StormStatus.ACTIVE) {
    return <IceAnimation />;
  }
  if (storms.sand === StormStatus.ACTIVE) {
    return <SandAnimation />;
  }
  if (storms.lightning === StormStatus.ACTIVE) {
    return <LightningAnimation />;
  }
  if (storms.wind === StormStatus.ACTIVE) {
    // return <WindAnimation />
  }
  return null;
}
