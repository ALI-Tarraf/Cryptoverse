import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

const { Title } = Typography;

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);
const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data.history[i]?.price);
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    if (timePeriod === "3h" || timePeriod === "24h") {
      coinTimestamp.push(
        new Date(
          coinHistory?.data?.history[i].timestamp * 1000
        ).toLocaleTimeString()
      );
    } else {
      coinTimestamp.push(
        new Date(
          coinHistory?.data?.history[i].timestamp * 1000
        ).toLocaleDateString()
      );
    }
  }
  const dataali = [];
  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    dataali.push(coinTimestamp[i], coinPrice[i]);
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: "category", // Explicitly set x-axis scale type
      },
      y: {
        type: "linear",
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
