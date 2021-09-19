import { StormStatus, StormStatuses } from "../StormsUtil";
import FireAnimation from "./Fire";
import IceAnimation from "./Ice";
import LightningAnimation from "./Lightning";
import SandAnimation from "./Sand";

export default function AllAnimations() {
  return (
    <div
      className="AllAnimations"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>
        <FireAnimation />
      </div>
      <div>
        <IceAnimation />
      </div>
      <div>
        <SandAnimation />
      </div>
    </div>
  );
}
