import React from "react";

const Atom = ({ count, player }) => {
  const images = [
    [
      "",
      "images/chain_reaction/single_1.png",
      "images/chain_reaction/double_1.png",
      "images/chain_reaction/triple_1.png",
    ],
    [
      "",
      "images/chain_reaction/single_2.png",
      "images/chain_reaction/double_2.png",
      "images/chain_reaction/triple_2.png",
    ],
    [
      "",
      "images/chain_reaction/single_3.png",
      "images/chain_reaction/double_3.png",
      "images/chain_reaction/triple_3.png",
    ],
    [
      "",
      "images/chain_reaction/single_4.png",
      "images/chain_reaction/double_4.png",
      "images/chain_reaction/triple_4.png",
    ],
  ];

  if (count > 0) {
    return (
      <img
        src={images[player - 1][count]}
        alt="Atom"
        className={`object-contain ${count == 1 ? "size-[60%]" : "size-[80%]"}`}
      />
    );
  }
};

export default Atom;
