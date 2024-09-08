import React from "react";

const Btn = ({ onClick }: any) => {
  return (
    <button className="text white bg-black px-4 py-3" onClick={onClick}>
      Resolve
    </button>
  );
};

export default Btn;
