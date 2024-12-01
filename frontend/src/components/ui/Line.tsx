import React from "react";

interface LineProps {
  width: string;
  height: string;
}
const Line: React.FC<LineProps> = ({ width, height }) => {
  return (
    <div
      style={{
        width: `${width}`,
        height: `${height}`,
        border: "4px solid black",
        borderRadius: "50% 50% 50% 50%",
      }}
    ></div>
  );
};

export default Line;
