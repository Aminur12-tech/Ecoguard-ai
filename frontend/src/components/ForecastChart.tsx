import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
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
      style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"12px",
        marginTop:"20px"
      }}
    >

      <h3>
        Visitor Forecast Trend
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="visitors"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
};

export default ForecastChart;