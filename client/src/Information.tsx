import React from "react";
import { etherscan } from "./deployment";

export default function Information() {
  return (
    <div className="information">
      <div>
        Stormwinds is a project to bring a world of storms and power to the
        adventurers of the Loot project.
      </div>
      <div className="links">
        <a href="https://github.com/msfeldstein/StormWinds"> Github </a> |
        <a href="https://twitter.com/stormwindsgame"> Twitter </a> |
        <a href={etherscan}> Etherscan </a>
      </div>
    </div>
  );
}
