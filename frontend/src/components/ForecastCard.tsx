import React from "react";

interface Props {
  visitors: number;
}

const ForecastCard: React.FC<Props> = ({
  visitors,
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
      <h4>Forecasted Visitors</h4>

      <h1>{visitors}</h1>

      <p>Tomorrow Prediction</p>
    </div>
  );
};

export default ForecastCard;