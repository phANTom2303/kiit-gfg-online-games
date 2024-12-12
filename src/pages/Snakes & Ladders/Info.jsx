import { ScrollShadow } from "@nextui-org/react";
import React from "react";

const SnakesLaddersInfo = () => {
  return <ScrollShadow className="h-full w-full px-6 pb-6">
    How to play.
    <ul>
      <li> Select no. of players. </li>
      <li> Press the dice button to start playing</li>
    </ul>
  </ScrollShadow>;
};

export default SnakesLaddersInfo;
