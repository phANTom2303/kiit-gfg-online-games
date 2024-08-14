function P5({ tileNum, p5Pos }) {
    if (tileNum == p5Pos)
        return <div className="player p5"></div>;
    else
        return <></>;
}
export default P5;