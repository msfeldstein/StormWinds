import React from "react";
import { activate, StormName, StormStatus } from "./StormsUtil";

type StatusRowProps = {
  name: StormName;
  status: StormStatus;
};
export default function StatusRow({ name, status }: StatusRowProps) {
  const statusStr = {
    [StormStatus.LOADING]: "Loading",
    [StormStatus.ACTIVE]: "Active",
    [StormStatus.INACTIVE]: "Calm",
  }[status];

  const activateStorm = () => {
    activate(name);
  };

  const prayForStorm = () => {
    console.log("Pray");
  };
  return (
    <div className={`${name} StatusRow`}>
      {name} storm {statusStr}{" "}
      <button onClick={activateStorm} disabled>
        Activate (No Helm / Rune)
      </button>
      <button onClick={prayForStorm}>Pray</button>
    </div>
  );
}
