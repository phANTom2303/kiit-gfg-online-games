function pieceSound() {
  const sound = new Audio();
  sound.src = "../../sound-effects/piece-sound.mp3";
  sound.play();
}

function ladderSound() {
  const sound = new Audio();
  sound.src = "../../sound-effects/ladder_sound.wav";
  sound.volume = 0.1;
  sound.play();
}

function snakeSound() {
  const sound = new Audio();
  sound.src = "../../sound-effects/snake_sound.mp3";
  sound.volume = 0.05;
  sound.play();
}

function buttonSound() {
  const sound = new Audio();
  sound.src = "../../../sound-effects/switch-button.mp3";
  sound.volume = 0.1;
  sound.play();
}

function popSound1() {
  const sound = new Audio();
  sound.src = "../../../sound-effects/pop-sound-1.mp3";
  sound.volume = 0.1;
  sound.play();
}

function popSound2() {
  const sound = new Audio();
  sound.src = "../../../sound-effects/pop-sound-2.mp3";
  sound.volume = 0.1;
  sound.play();
}

function gameStartSound() {
  const sound = new Audio();
  sound.src = "../../../sound-effects/game-start.mp3";
  sound.volume = 0.1;
  sound.play();
}

function spacebarSound() {
  const sound = new Audio();
  sound.src = "../../../sound-effects/spacebar.mp3";
  sound.volume = 0.1;
  sound.play();
}

function gameWinSound() {
  const sound = new Audio();
  sound.src = "../../../sound-effects/tada.mp3";
  sound.volume = 0.3;
  sound.play();
}

export default function playSoundOf(soundOf, soundStatus) {
  if (!soundStatus) return;
  else if (soundOf == "ladder") ladderSound();
  else if (soundOf == "snake") snakeSound();
  else if (soundOf == "piece") pieceSound();
  else if (soundOf == "button") buttonSound();
  else if (soundOf == "pop1") popSound1();
  else if (soundOf == "pop2") popSound2();
  else if (soundOf == "game-start") gameStartSound();
  else if (soundOf == "spacebar") spacebarSound();
  else if (soundOf == "game-win") gameWinSound();
}
