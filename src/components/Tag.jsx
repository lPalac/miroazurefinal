import * as React from "react";

const Tag = ({ status, color }) => {
  return (
    <div className="tag-container" style={{ backgroundColor: color }}>
      <p>{status.name}</p>
    </div>
  );
};

export default Tag;
