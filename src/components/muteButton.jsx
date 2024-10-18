export default function MuteButton({ soundStatus }) {
  if (soundStatus) return <img src="../../header-icons/volume-on.png" />;
  else return <img src="../../header-icons/volume-off.png" />;
}
