import React, { useState } from "react";

function Players({ onPlayersChanged }) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder={`Enter player ${count + 1}`}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyPress={e => {
          if (e.key === "Enter") {
            setCount(count + 1);
            setValue("");
            onPlayersChanged(e.target.value);
          }
        }}
      />
    </div>
  );
}

export { Players };
