import { StormStatus, StormStatuses } from "../StormsUtil";
import FireAnimation from "./Fire";
import IceAnimation from "./Ice";
import LightningAnimation from "./Lightning";
import SandAnimation from "./Sand";

export default function ActiveAnimation({ storms }: { storms: StormStatuses }) {
  const animations = [];
  if (storms.fire === StormStatus.ACTIVE) {
    animations.push(<FireAnimation />);
  }
  if (storms.ice === StormStatus.ACTIVE) {
    animations.push(<IceAnimation />);
  }
  if (storms.sand === StormStatus.ACTIVE) {
    animations.push(<SandAnimation />);
  }
  if (storms.lightning === StormStatus.ACTIVE) {
    animations.push(<LightningAnimation />);
  }
  if (storms.wind === StormStatus.ACTIVE) {
    // animations.push(<WindAnimation />
  }
  return <>{animations}</>;
}
