function P1({ tileNum, p1Pos }) {
    if (tileNum == p1Pos)
        return <div className="player p1"></div>;
    else
        return <></>;
}
export default P1;