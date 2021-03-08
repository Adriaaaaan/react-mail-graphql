import { useState } from 'react';
import { useToggle, toggleReducer, actionTypes } from '../hooks/toggle.js';
import Switch from './switch.js';

export default function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = useState(0)
  const tooManyClicks = clicksSinceReset >= 4;
  const { on, toggle, setOn, setOff } = useToggle({
    reducer(currentState, action) {
      const changes = toggleReducer(currentState, action)
      if (tooManyClicks && action.type === actionTypes.toggle) {
        // other changes are fine, but on needs to be unchanged
        return {...changes, on: currentState.on}
      } else {
        // the changes are fine
        return changes
      }
    },
  });

  function handleClick() {
    toggle();
    setClicksSinceReset(count => count + 1);
  }

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Swtich On</button>
      <Switch on={on} onClick={handleClick}></Switch>
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  );
}
