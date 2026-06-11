interface Props {
    occupancy: number;
}

const OccupancyCard = ({
    occupancy,
}: Props) => {

    const getColor = () => {

        if (occupancy >= 90) {
            return "text-red-500";
        }

        if (occupancy >= 70) {
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
                    Homestay Occupancy
                </h4>

                <span
                    className="
                    text-3xl
                    "
                >
                    🏡
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
                {occupancy}%
            </h1>

            <div
                className="
                mt-4
                w-full
                bg-gray-200
                rounded-full
                h-3
                "
            >

                <div
                    className={`
                    h-3
                    rounded-full
                    ${
                        occupancy >= 90
                            ? "bg-red-500"
                            : occupancy >= 70
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }
                    `}
                    style={{
                        width: `${occupancy}%`,
                    }}
                />

            </div>

            <p
                className="
                text-sm
                text-gray-500
                mt-3
                "
            >
                Current booking utilization
            </p>

        </div>

    );
};

export default OccupancyCard;