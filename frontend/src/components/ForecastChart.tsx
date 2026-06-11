import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface ForecastItem {
    day: string;
    visitors: number;
}

interface Props {
    data: ForecastItem[];
}

const ForecastChart = ({
    data,
}: Props) => {

    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
            mt-6
            "
        >

            <div
                className="
                flex
                justify-between
                items-center
                mb-6
                "
            >

                <h3
                    className="
                    text-xl
                    font-bold
                    "
                >
                    Visitor Forecast Trend
                </h3>

                <span
                    className="
                    text-3xl
                    "
                >
                    📈
                </span>

            </div>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart
                    data={data}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="day"
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                        }}
                        activeDot={{
                            r: 8,
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
};

export default ForecastChart;