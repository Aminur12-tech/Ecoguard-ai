import React from "react";

interface Props {
  level: string;
}

const CrowdLevelCard: React.FC<Props> = ({
  level,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h4>Crowd Level</h4>

      <h1>{level}</h1>
    </div>
  );
};

export default CrowdLevelCard;