function P2({ tileNum, p2Pos }) {
    if (tileNum == p2Pos)
        return <div className="player p2">2</div>;
    else
        return <></>;
}
export default P2;