// player 1 sample div :  <div className="player p1">1</div>;

export default function PlayerDisplay({ curPlayer }) {
  if (curPlayer == 0) {
    return <div className="player p1">1</div>;
  } else if (curPlayer == 1) {
    return <div className="player p2">2</div>;
  } else if (curPlayer == 2) {
    return <div className="player p3">3</div>;
  } else if (curPlayer == 3) {
    return <div className="player p4">4</div>;
  } else {
    return <></>;
  }
}
