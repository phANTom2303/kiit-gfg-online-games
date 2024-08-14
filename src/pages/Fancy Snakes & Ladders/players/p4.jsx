function P4({ tileNum, p4Pos }) {
    if (tileNum == p4Pos)
        return <div className="player p4"></div>;
    else
        return <></>;
}
export default P4;