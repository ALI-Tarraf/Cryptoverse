import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://coinrevolution.com/wp-content/uploads/2024/10/Bitcoin-Analysis-Predicts-BTC-Price-Increase-Due-to-Coinbase-Premium.png";
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 10,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.data) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={`${coin.name}`}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.data?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news?.title.length > 60
                    ? `${news.title.substring(0, 60)}...`
                    : news.title}
                </Title>
                <img src={news?.thumbnail || demoImage} alt="news" />
              </div>
              <p>
                {news?.excerpt.length > 100
                  ? `${news.excerpt.substring(0, 100)}...`
                  : news.excerpt}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news?.publisher?.favicon || demoImage}
                    alt="news"
                  />
                  <Text className="provider-name">{news?.publisher?.name}</Text>
                </div>
                <Text>{moment(news?.date).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
