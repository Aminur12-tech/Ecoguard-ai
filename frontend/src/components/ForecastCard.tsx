import React from "react";

interface Props {
    visitors: number;
}

const ForecastCard: React.FC<Props> = ({
    visitors,
}) => {

    const getColor = () => {

        if (visitors > 300) {
            return "text-red-500";
        }

        if (visitors > 200) {
            return "text-yellow-500";
        }

        return "text-green-500";
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
                justify-between
                items-center
                "
            >

                <h4
                    className="
                    text-gray-500
                    text-sm
                    font-medium
                    "
                >
                    Forecasted Visitors
                </h4>

                <span
                    className="
                    text-3xl
                    "
                >
                    👥
                </span>

            </div>

            <h1
                className={`
                text-4xl
                font-bold
                mt-4
                ${getColor()}
                `}
            >
                {visitors}
            </h1>

            <p
                className="
                text-gray-500
                text-sm
                mt-3
                "
            >
                Tomorrow's visitor prediction
            </p>

        </div>

    );
};

export default ForecastCard;