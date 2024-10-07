export default function PlayerTile({ tileString }) {
  if (tileString === 0b0000) {
    return <div className="slbox"></div>;
  } else if (tileString === 0b0001) {
    // only player 4
    return (
      <div className="slbox">
        <div className="player p4">4</div>
      </div>
    );
  } else if (tileString === 0b0010) {
    // only player 3
    return (
      <div className="slbox">
        <div className="player p3">3</div>
      </div>
    );
  } else if (tileString === 0b0011) {
    return (
      <div className="slbox">
        <div className="player p3">3</div>
        <div className="player p4">4</div>
      </div>
    );
  } else if (tileString === 0b0100) {
    // only player 2
    return (
      <div className="slbox">
        <div className="player p2">2</div>
      </div>
    );
  } else if (tileString === 0b0101) {
    return (
      <div className="slbox">
        <div className="player p2">2</div>
        <div className="player p4">4</div>
      </div>
    );
  } else if (tileString === 0b0110) {
    return (
      <div className="slbox">
        <div className="player p2">2</div>
        <div className="player p3">3</div>
      </div>
    );
  } else if (tileString === 0b0111) {
    return (
      <div className="slbox">
        <div className="player p2">2</div>
        <div className="player p3">3</div>
        <div className="player p4">4</div>
      </div>
    );
  } else if (tileString === 0b1000) {
    // only player 1
    return (
      <div className="slbox">
        <div className="player p1">1</div>
      </div>
    );
  } else if (tileString === 0b1001) {
    return (
      <div className="slbox">
        <div className="player p1">1</div>
        <div className="player p4">4</div>
      </div>
    );
  } else if (tileString === 0b1010) {
    return (
      <div className="slbox">
        <div className="player p1">1</div>
        <div className="player p3">3</div>
      </div>
    );
  } else if (tileString === 0b1011) {
    return (
      <div className="slbox">
        <div className="player p1">1</div>
        <div className="player p3">3</div>
        <div className="player p4">4</div>
      </div>
    );
  } else if (tileString === 0b1100) {
    return (
      <div className="slbox">
        <div className="player p1">1</div>
        <div className="player p2">2</div>
      </div>
    );
  } else if (tileString === 0b1101) {
    return (
      <div className="slbox">
        <div className="player p1">1</div>
        <div className="player p2">2</div>
        <div className="player p4">4</div>
      </div>
    );
  } else if (tileString === 0b1110) {
    return (
      <div className="slbox">
        <div className="player p1">1</div>
        <div className="player p2">2</div>
        <div className="player p3">3</div>
      </div>
    );
  } else if (tileString === 0b1111) {
    return (
      <div className="slbox">
        <div className="player p1">1</div>
        <div className="player p2">2</div>
        <div className="player p3">3</div>
        <div className="player p4">4</div>
      </div>
    );
  }
}
