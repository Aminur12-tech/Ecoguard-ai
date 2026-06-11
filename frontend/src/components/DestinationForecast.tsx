type Props = {
    data: {
        destination: string;
        visitors: number;
        status: string;
    }[];
};

function DestinationForecast({
    data,
}: Props) {

    const getStatusColor = (
        status: string
    ) => {

        switch (
            status.toLowerCase()
        ) {

            case "high":
                return `
                bg-red-100
                text-red-700
                `;

            case "medium":
                return `
                bg-yellow-100
                text-yellow-700
                `;

            default:
                return `
                bg-green-100
                text-green-700
                `;
        }
    };

    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
            "
        >

            <div
                className="
                flex
                items-center
                justify-between
                mb-6
                "
            >

                <h3
                    className="
                    text-xl
                    font-bold
                    "
                >
                    Destination Forecast
                </h3>

                <span
                    className="
                    text-3xl
                    "
                >
                    🗺️
                </span>

            </div>

            <div
                className="
                overflow-x-auto
                "
            >

                <table
                    className="
                    w-full
                    text-left
                    "
                >

                    <thead>

                        <tr
                            className="
                            border-b
                            "
                        >

                            <th
                                className="
                                py-3
                                text-gray-500
                                "
                            >
                                Destination
                            </th>

                            <th
                                className="
                                py-3
                                text-gray-500
                                "
                            >
                                Visitors
                            </th>

                            <th
                                className="
                                py-3
                                text-gray-500
                                "
                            >
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.map(
                            (item) => (

                                <tr
                                    key={
                                        item.destination
                                    }
                                    className="
                                    border-b
                                    hover:bg-gray-50
                                    "
                                >

                                    <td
                                        className="
                                        py-4
                                        font-medium
                                        "
                                    >
                                        {
                                            item.destination
                                        }
                                    </td>

                                    <td
                                        className="
                                        py-4
                                        font-semibold
                                        "
                                    >
                                        {
                                            item.visitors
                                        }
                                    </td>

                                    <td
                                        className="
                                        py-4
                                        "
                                    >

                                        <span
                                            className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            font-semibold
                                            ${getStatusColor(
                                                item.status
                                            )}
                                            `}
                                        >
                                            {
                                                item.status
                                            }
                                        </span>

                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default DestinationForecast;