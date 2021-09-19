import React from "react";
import { summon, StormName, StormStatus } from "./StormsUtil";

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

  const summonStorm = () => {
    summon(name);
  };

  const prayForStorm = () => {
    console.log("Pray");
  };
  return (
    <div className={`${name} StatusRow`}>
      <button onClick={summonStorm}>Summon</button>
      {" | "}
      <button onClick={prayForStorm}>Pray</button>
      {" | "}
      {name} storm {statusStr}
    </div>
  );
}
