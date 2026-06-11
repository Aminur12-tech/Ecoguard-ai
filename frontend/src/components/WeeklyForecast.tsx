interface ForecastItem {
    day: string;
    visitors: number;
}

interface Props {
    data?: ForecastItem[];
}

const WeeklyForecast = ({
    data = []
}: Props) => {

    return (
        <div
            className="
            grid
            grid-cols-2
            md:grid-cols-4
            lg:grid-cols-7
            gap-4
            mt-6
            "
        >
            {data.map((item) => (
                <div
                    key={item.day}
                    className="
                    bg-white
                    rounded-xl
                    shadow-md
                    p-4
                    text-center
                    "
                >
                    <h4>{item.day}</h4>

                    <h2
                        className="
                        text-2xl
                        font-bold
                        "
                    >
                        {item.visitors}
                    </h2>

                    <small>
                        Visitors
                    </small>
                </div>
            ))}
        </div>
    );
};

export default WeeklyForecast;