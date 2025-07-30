let currMoleTile;
let currentPlantTile;
let score =0;
let gameOver = false;


window.onload = function() {
    setGame();
}

function setGame() {
    for( let i=0; i<9; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);

    }
    setInterval(setMole, 1000);
    setInterval(setPlant,2000);
}

function getRandomTile() {

    // clearing the mole tag
    if(currMoleTile){
        currMoleTile.innerHTML ="";
    }

    let num = Math.floor(Math.random() *9);
    return num.toString();
}

function setMole() {

    if(gameOver){
        return;
    }
    let mole = document.createElement("img")
    mole.src = "monty-mole.png"

    let num = getRandomTile();
        
        if(currentPlantTile && currentPlantTile.id == num){
            return;
        }
    
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {

    if(gameOver){
        return;
    }

    if(currentPlantTile){
        currentPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "piranha-plant.png"

    let num = getRandomTile();
    if(currMoleTile && currMoleTile.id == num){
        return;
    }
    currentPlantTile = document.getElementById(num);
    
    currentPlantTile.appendChild(plant);

}

function selectTile(){

    if(gameOver){
        return;
    }

    if(this == currMoleTile){
        score+=10;
        document.getElementById("score").innerText = score.toString();
    }

    else if(this == currentPlantTile){
        document.getElementById("score").innerText = "GAME OVER: "+score.toString();
        
        gameOver = true;
    }
}

// Add event listener for the send button
document.getElementById("send-btn").addEventListener("click", function() {
    // Get the chat input value
    var chatInput = document.getElementById("chat-input").value;

    // Clear the input field
    document.getElementById("chat-input").value = "";

    // Add the chat message to the chat log
    var chatLog = document.getElementById("chat-log");
    chatLog.innerHTML += "<p>" + chatInput + "</p>";
});
