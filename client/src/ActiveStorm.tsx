import React from "react";
import { StormStatus, StormStatuses } from "./StormsUtil";

export default function ActiveStorm({ storms }: { storms: StormStatuses }) {
  const messageElements: JSX.Element[] = [];
  const messages = {
    fire: "A fire storm rages to the east",
    ice: "An ice storm freezes the lakes",
    sand: "A sand storm blots out the skies",
    wind: "A windstorm batters the plains",
    lightning: "A lightning storm slashes the skies",
  };
  const keys = Object.keys(storms) as Array<keyof StormStatuses>;
  keys.forEach((key) => {
    if (storms[key] === StormStatus.ACTIVE) {
      messageElements.push(
        <div key={key} className={`ActiveStorm ${key}`}>
          {messages[key]}
        </div>
      );
    }
  });
  if (messageElements.length === 0) {
    messageElements.push(
      <div key={"calm"} className={`ActiveStorm calm`}>
        A tenuous calm settles over the realm
      </div>
    );
  }
  return <div className="ActiveStorms">{messageElements}</div>;
}
