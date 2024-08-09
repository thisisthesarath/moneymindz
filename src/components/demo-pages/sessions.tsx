import React from 'react';
import { BreadcrumbProps } from 'antd';
import BasePageContainer from '../layout/PageContainer';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import { FaRegCalendarAlt } from 'react-icons/fa';
import packageJson from '../../../package.json';

interface Webinar {
  title: string;
  description: string;
  date: string;
  link: string;
  image: string;
}

const webinars: Webinar[] = [
  {
    title: 'Investing 101: Basics of Stock Market',
    description: 'An introductory webinar on the basics of investing in the stock market. Perfect for beginners.',
    date: '2024-08-15',
    link: '/webinars/investing-101',
    image: 'https://via.placeholder.com/600x400?text=Investing+101',
  },
  {
    title: 'Understanding Cryptocurrency',
    description: 'Dive into the world of cryptocurrencies and learn how they work and their potential impact on the financial markets.',
    date: '2024-08-22',
    link: '/webinars/understanding-cryptocurrency',
    image: 'https://via.placeholder.com/600x400?text=Cryptocurrency',
  },
  {
    title: 'Advanced Portfolio Management',
    description: 'Explore advanced strategies for managing your investment portfolio to maximize returns and minimize risk.',
    date: '2024-08-29',
    link: '/webinars/advanced-portfolio-management',
    image: 'https://via.placeholder.com/600x400?text=Portfolio+Management',
  },
];

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Home</Link>,
    },
    {
      key: webRoutes.webinars,
      title: <Link to={webRoutes.webinars}>Webinars</Link>,
    },
  ],
};

const Webinars: React.FC = () => {
  const packageVersion = packageJson.version;

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div className="m-5">
        <article>
          <header className="mb-9 space-y-1">
            <h1 className="font-display text-3xl tracking-tight text-slate-900">
              Upcoming Webinars
            </h1>
          </header>
          <div>
            <p className="lead">
              Join our upcoming webinars to enhance your knowledge in finance and investing.
            </p>
            <div className="my-12 space-y-6">
              {webinars.map((webinar) => (
                <div key={webinar.title} className="group relative rounded-xl border border-slate-200 overflow-hidden">
                  <img src={webinar.image} alt={webinar.title} className="w-full h-40 object-cover" />
                  <div className="p-6">
                    <FaRegCalendarAlt className="text-4xl opacity-90" />
                    <h2 className="mt-4 font-display text-base text-slate-900">
                      <a
                        href={webinar.link}
                        className="hover:text-primary"
                      >
                        {webinar.title}
                      </a>
                    </h2>
                    <p className="mt-1 text-sm text-slate-700">{webinar.description}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      <strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </BasePageContainer>
  );
};

export default Webinars;
