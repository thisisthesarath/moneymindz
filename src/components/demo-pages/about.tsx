import React from 'react';
import { BreadcrumbProps } from 'antd';
import BasePageContainer from '../layout/PageContainer';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import { AiOutlineComment, AiOutlineMessage, AiOutlineStar } from 'react-icons/ai';
import { FaRegLightbulb } from 'react-icons/fa';
import packageJson from '../../../package.json';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Home</Link>,
    },
    {
      key: webRoutes.forum,
      title: <Link to={webRoutes.forum}>Forum</Link>,
    },
  ],
};

const Forum: React.FC = () => {
  const packageVersion = packageJson.version;

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div className="m-5">
        <article>
          <header className="mb-9 space-y-1">
            {/* <p className="font-display text-sm font-medium text-primary">
              v{packageVersion}
            </p> */}
            <h1 className="font-display text-3xl tracking-tight text-slate-900">
              Forum
            </h1>
          </header>
          <div>
            <p className="lead">
              Welcome to the community forum. Engage in discussions and share your thoughts.
            </p>
            <div className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="group relative rounded-xl border border-slate-200">
                <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-xl p-6">
                  <AiOutlineComment className="text-4xl opacity-90" />
                  <h2 className="mt-4 font-display text-base text-slate-900">
                    <a
                      href="/forum/discussions"
                      className="hover:text-primary"
                    >
                      <span className="absolute -inset-px rounded-xl" />
                      Discussions
                    </a>
                  </h2>
                  <p className="mt-1 text-sm text-slate-700">
                    Participate in ongoing discussions and start new threads.
                  </p>
                </div>
              </div>
              <div className="group relative rounded-xl border border-slate-200">
                <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-xl p-6">
                  <AiOutlineMessage className="text-4xl opacity-90" />
                  <h2 className="mt-4 font-display text-base text-slate-900">
                    <a
                      href="/forum/messages"
                      className="hover:text-primary"
                    >
                      <span className="absolute -inset-px rounded-xl" />
                      Messages
                    </a>
                  </h2>
                  <p className="mt-1 text-sm text-slate-700">
                    Check your private messages and notifications.
                  </p>
                </div>
              </div>
              <div className="group relative rounded-xl border border-slate-200">
                <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-xl p-6">
                  <AiOutlineStar className="text-4xl opacity-90" />
                  <h2 className="mt-4 font-display text-base text-slate-900">
                    <a
                      href="/forum/popular"
                      className="hover:text-primary"
                    >
                      <span className="absolute -inset-px rounded-xl" />
                      Popular Topics
                    </a>
                  </h2>
                  <p className="mt-1 text-sm text-slate-700">
                    Browse the most popular topics and threads.
                  </p>
                </div>
              </div>
              <div className="group relative rounded-xl border border-slate-200">
                <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-xl p-6">
                  <FaRegLightbulb className="text-4xl opacity-90" />
                  <h2 className="mt-4 font-display text-base text-slate-900">
                    <a
                      href="/forum/contribute"
                      className="hover:text-primary"
                    >
                      <span className="absolute -inset-px rounded-xl" />
                      Contribute
                    </a>
                  </h2>
                  <p className="mt-1 text-sm text-slate-700">
                    Learn how you can contribute to the forum and make it better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </BasePageContainer>
  );
};

export default Forum;
