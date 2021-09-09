import React from "react";
import StatusRow from "./StatusRow";
import { StormStatuses } from "./StormsUtil";

export default function AllStorms({ storms }: { storms: StormStatuses }) {
  const keys = Object.keys(storms) as Array<keyof StormStatuses>;
  return (
    <div className="StormsList">
      {keys.map((storm) => {
        return <StatusRow key={storm} name={storm} status={storms[storm]} />;
      })}
    </div>
  );
}
