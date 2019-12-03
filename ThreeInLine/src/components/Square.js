import React from "react";

function Square({ value, onChangeSquare }) {
  return (
    <button className="square" onClick={onChangeSquare}>
      {value}
    </button>
  );
}

export { Square };
