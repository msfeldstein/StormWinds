import React, { useState } from "react";
import { summon, StormName, StormStatus } from "./StormsUtil";

type StatusRowProps = {
  name: StormName;
  status: StormStatus;
};
export default function StatusRow({ name, status }: StatusRowProps) {
  const [summoning, setSummoning] = useState(false);
  const statusStr = {
    [StormStatus.LOADING]: "Loading",
    [StormStatus.ACTIVE]: "Active",
    [StormStatus.INACTIVE]: "Calm",
  }[status];

  const summonStorm = async () => {
    setSummoning(true);
    const response = await summon(name);
    await response.wait();
    setSummoning(false);
  };

  let button = summoning ? (
    <button disabled>Summoning...</button>
  ) : (
    <button onClick={summonStorm}>Summon</button>
  );
  if (status === StormStatus.ACTIVE) button = <button disabled>......</button>;

  return (
    <div className={`${name} StatusRow`}>
      {button}
      {" | "}
      {name} storm {statusStr}
    </div>
  );
}
