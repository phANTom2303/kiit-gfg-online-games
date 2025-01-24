function C4tile({value}){
    if(value == null)
    return(<div className="tile"></div> );
    else if(value === 1)
        return(<div className="red tile"></div>);
    else
    return(<div className="yellow tile"></div>);
}
export default C4tile;