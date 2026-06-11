type Props = {
    climateImpact: string;
    temperature: number;
    humidity: number;
    rainfall: number;
};

function ClimateImpactCard({
    climateImpact,
    temperature,
    humidity,
    rainfall,
}: Props) {

    const getImpactColor = () => {

        if (
            climateImpact
                .toLowerCase()
                .includes("rain")
        ) {
            return "text-blue-600";
        }

        if (
            climateImpact
                .toLowerCase()
                .includes("heat")
        ) {
            return "text-red-600";
        }

        return "text-green-600";
    };

    return (
        <div
            className="
            bg-gradient-to-r
            from-blue-500
            to-cyan-500
            text-white
            rounded-2xl
            shadow-lg
            p-6
            hover:scale-[1.02]
            transition-all
            duration-300
            "
        >
            <div className="flex justify-between items-center">

                <h3
                    className="
                    text-lg
                    font-semibold
                    "
                >
                    Climate Impact
                </h3>

                <span className="text-4xl">
                    🌦️
                </span>

            </div>

            <div className="mt-6 space-y-3">

                <div
                    className="
                    flex
                    justify-between
                    "
                >
                    <span>
                        🌡 Temperature
                    </span>

                    <strong>
                        {temperature}°C
                    </strong>
                </div>

                <div
                    className="
                    flex
                    justify-between
                    "
                >
                    <span>
                        💧 Humidity
                    </span>

                    <strong>
                        {humidity}%
                    </strong>
                </div>

                <div
                    className="
                    flex
                    justify-between
                    "
                >
                    <span>
                        🌧 Rainfall
                    </span>

                    <strong>
                        {rainfall} mm
                    </strong>
                </div>

            </div>

            <div
                className="
                mt-6
                bg-white
                rounded-xl
                p-3
                "
            >
                <p
                    className={`
                    text-center
                    font-bold
                    ${getImpactColor()}
                    `}
                >
                    {climateImpact}
                </p>
            </div>

        </div>
    );
}

export default ClimateImpactCard;