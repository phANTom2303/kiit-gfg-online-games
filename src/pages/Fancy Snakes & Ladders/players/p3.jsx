function P3({ tileNum, p3Pos }) {
    if (tileNum == p3Pos)
        return <div className="player p3"></div>;
    else
        return <></>;
}
export default P3;