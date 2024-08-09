import { useEffect, useState } from 'react';
import BasePageContainer from '../layout/PageContainer';
import {
  Avatar,
  BreadcrumbProps,
  Card,
  Col,
  List,
  Progress,
  Rate,
  Row,
  Table,
  Tag,
} from 'antd';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import StatCard from './StatCard';
import { AiOutlineStar, AiOutlineTeam } from 'react-icons/ai';
import Icon from '@ant-design/icons';
import { BiCommentDetail, BiPhotoAlbum } from 'react-icons/bi';
import { MdOutlineArticle, MdOutlinePhoto } from 'react-icons/md';
import { StatisticCard } from '@ant-design/pro-components';
import LazyImage from '../lazy-image';
import { User } from '../../interfaces/models/user';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import { handleErrorResponse } from '../../utils';
import { Review } from '../../interfaces/models/review';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Home</Link>,
    },
  ],
};


const dummyNews = [
  {
    title: 'Stock Market Hits All-Time High',
    description: 'The stock market reached an all-time high today, driven by strong earnings reports and positive economic data.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReAZKrltA6I7YxoUzLdI20GfIGJKUeNbvMBA&s',
    date: '2024-08-09',
  },
  {
    title: 'Federal Reserve Announces Interest Rate Hike',
    description: 'The Federal Reserve has announced an increase in interest rates to combat rising inflation, affecting borrowing costs across the board.',
    image: 'https://d28wu8o6itv89t.cloudfront.net/images/FederalReserveActpng-1596094108897.png',
    date: '2024-08-08',
  },
  {
    title: 'Tech Giants Report Record Profits',
    description: 'Several major tech companies have reported record profits for the last quarter, boosting their stock prices and market confidence.',
    image: 'https://d2eehagpk5cl65.cloudfront.net/img/c800x450-w800-q80/uploads/2023/01/dreamstime_xxl_209504587-800x450.jpg',
    date: '2024-08-07',
  },
];


const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    Promise.all([loadUsers(), loadReviews()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  }, []);

  const loadUsers = () => {
    return http
      .get(apiRoutes.users, {
        params: {
          per_page: 4,
        },
      })
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  const loadReviews = () => {
    return http
      .get(apiRoutes.reviews, {
        params: {
          per_page: 5,
        },
      })
      .then((response) => {
        setReviews(
          response.data.data.map((rawReview: any) => {
            const review: Review = {
              id: rawReview.id,
              title: rawReview.name,
              color: rawReview.color,
              year: rawReview.year,
              star: Math.floor(Math.random() * 5) + 1,
            };

            return review;
          })
        );
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      <Row gutter={24}>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={AiOutlineTeam} />}
            title="Credits"
            number={12000}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={MdOutlineArticle} />}
            title="Balance"
            number={10000}
          />
        </Col>
        {/* <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={BiPhotoAlbum} />}
            title="Albums"
            number={100}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={MdOutlinePhoto} />}
            title="Photos"
            number={500}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={BiCommentDetail} />}
            title="Comments"
            number={500}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={AiOutlineStar} />}
            title="Reviews"
            number={100}
          />
        </Col> */}
        <Col
          xl={12}
          lg={12}
          md={24}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default">
            <StatisticCard.Group direction="row">
              <StatisticCard
                statistic={{
                  title: 'Goal',
                  value: loading ? 0 : 30000,
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Total Spent',
                  value: '12000',
                }}
                chart={
                  <Progress
                    className="text-primary"
                    percent={loading ? 0 : 75}
                    type="circle"
                    size={'small'}
                    strokeColor={CONFIG.theme.accentColor}
                  />
                }
                chartPlacement="left"
              />
            </StatisticCard.Group>
          </Card>
        </Col>


        <Col
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <h3 style={{ marginBottom: 16 }}>Latest News!</h3>
          <Card bordered={false} className="w-full h-full cursor-default">
            <List
              loading={false} // Assuming loading is false for the dummy data
              itemLayout="horizontal"
              dataSource={dummyNews}
              renderItem={(newsItem) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size="large"
                        src={
                          <LazyImage
                            src={newsItem.image}
                            placeholder={
                              <div className="bg-gray-100 h-full w-full" />
                            }
                          />
                        }
                      />
                    }
                    title={newsItem.title}
                    description={
                      <>
                        <p>{newsItem.description}</p>
                        <p><small>{new Date(newsItem.date).toLocaleDateString()}</small></p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>




        {/* <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default">
            <Table
              loading={loading}
              pagination={false}
              showHeader={false}
              dataSource={reviews}
              columns={[
                {
                  title: 'Title',
                  dataIndex: 'title',
                  key: 'title',
                  align: 'left',
                },
                {
                  title: 'Year',
                  dataIndex: 'year',
                  key: 'year',
                  align: 'center',
                  render: (_, row: Review) => (
                    <Tag color={row.color}>{row.year}</Tag>
                  ),
                },
                {
                  title: 'Star',
                  dataIndex: 'star',
                  key: 'star',
                  align: 'center',
                  render: (_, row: Review) => (
                    <Rate disabled defaultValue={row.star} />
                  ),
                },
              ]}
            />
          </Card>
        </Col> */}
      </Row>
    </BasePageContainer>
  );
};

export default Dashboard;
