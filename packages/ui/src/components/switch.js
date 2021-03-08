export default function Switch({on, onClick}) {
  return (
    <p onClick={onClick}>Switched: {on ? 'on' : 'off'}</p>
  );
}