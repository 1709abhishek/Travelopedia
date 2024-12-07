import React from "react";

const ReactQuill = ({ value, onChange }) => {
  return (
    <textarea
      data-testid="content-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ReactQuill;
