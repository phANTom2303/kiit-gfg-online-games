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

export default function playSoundOf(soundOf, soundStatus) {
  if (!soundStatus) return;
  else if (soundOf == "ladder") ladderSound();
  else if (soundOf == "snake") snakeSound();
  else if (soundOf == "piece") pieceSound();
  else if (soundOf == "button") buttonSound();
}
