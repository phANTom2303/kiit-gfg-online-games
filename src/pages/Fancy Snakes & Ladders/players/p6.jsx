function P6({ tileNum, p6Pos }) {
    if (tileNum == p6Pos)
        return <div className="player p6"></div>;
    else
        return <></>;
}
export default P6;