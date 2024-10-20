export default function MuteButton({ soundStatus }) {
  if (soundStatus)
    return (
      <img
        src="../../header-icons/volume-on.png"
        style={{ height: "3vw", width: "3vw" }}
      />
    );
  else
    return (
      <img
        src="../../header-icons/volume-off.png"
        style={{ height: "3vw", width: "3vw" }}
      />
    );
}
