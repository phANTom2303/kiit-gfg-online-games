import P1 from "./players/p1";
import P2 from "./players/p2";
import P3 from "./players/p3";
import P4 from "./players/p4";

export default function PlayerDisplay(currentPlayer) {
  return (
    <>
      <P1 tileNum={currentPlayer} p1Pos={0} />
      <P2 tileNum={currentPlayer} p2Pos={1} />
      <P3 tileNum={currentPlayer} p3Pos={2} />
      <P4 tileNum={currentPlayer} p4Pos={3} />
    </>
  );
}
