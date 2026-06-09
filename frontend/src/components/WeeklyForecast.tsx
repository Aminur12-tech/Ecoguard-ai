interface ForecastItem {
  day: string;
  visitors: number;
}

interface Props {
  data: ForecastItem[];
}

const WeeklyForecast = ({ data }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {data.map((item) => (
        <div
          key={item.day}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h4>{item.day}</h4>

          <h2>{item.visitors}</h2>

          <small>Visitors</small>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;