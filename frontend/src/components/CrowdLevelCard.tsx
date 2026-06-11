import React from "react";

interface Props {
  level: string;
}

const CrowdLevelCard: React.FC<Props> = ({
  level,
}) => {

  const getColor = () => {

    switch(level){

      case "High":
        return "text-red-500";

      case "Medium":
      case "Moderate":
        return "text-yellow-500";

      default:
        return "text-green-500";
    }
  };

  return (

    <div
      className="
      bg-white
      rounded-2xl
      p-6
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      "
    >

      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <h4
          className="
          text-gray-500
          text-sm
          font-medium
          "
        >
          Crowd Level
        </h4>

        <span
          className="
          text-3xl
          "
        >
          📊
        </span>

      </div>

      <h1
        className={`
        text-3xl
        font-bold
        mt-4
        ${getColor()}
        `}
      >
        {level}
      </h1>

    </div>
  );
};

export default CrowdLevelCard;