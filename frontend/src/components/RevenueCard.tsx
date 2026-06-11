interface Props {
    visitors: number;
}

const RevenueCard = ({
    visitors,
}: Props) => {

    const revenue =
        visitors * 1500;

    const getRevenueColor = () => {

        if (revenue > 500000) {
            return "text-green-600";
        }

        if (revenue > 300000) {
            return "text-blue-600";
        }

        return "text-purple-600";
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
                    Estimated Revenue
                </h4>

                <span
                    className="
                    text-3xl
                    "
                >
                    💰
                </span>

            </div>

            <h1
                className={`
                text-3xl
                font-bold
                mt-4
                ${getRevenueColor()}
                `}
            >
                ₹{revenue.toLocaleString()}
            </h1>

            <p
                className="
                text-sm
                text-gray-500
                mt-3
                "
            >
                Based on average tourist spending
            </p>

        </div>

    );
};

export default RevenueCard;