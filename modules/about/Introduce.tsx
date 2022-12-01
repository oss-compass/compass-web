import React from 'react';
import { Title, Paragraph, Link } from './components';

const Introduce = () => {
  return (
    <div className="mb-12">
      <Paragraph>Welcome to the OSS Compass Community! </Paragraph>
      <Paragraph>
        We provide a public SaaS platform
        <Link href="https://oss-compass.org/">OSS Compass</Link>
        for open source community health analytics, that is open for all the
        projects hosted on Github, Gitee, etc.
      </Paragraph>
      <Title>Our Vision</Title>
      <Paragraph>
        Through <Link href="https://oss-compass.org/">OSS Compass</Link>, we
        help people who need community data analysis, including but not limited
        to OSPOs, community managers, academic researchers, project owners,
        maintainers, developers, etc.
      </Paragraph>
      <Paragraph>
        By analyzing real data from a large number of open source projects, and
        referring to research results from industry best practices and
        academics, we create an open source community
        <Link href="https://github.com/oss-compass/docs/tree/main/metrics-models">
          Ecosystem Evaluation System
        </Link>
        that can be continuously improved and evolved, and give back to the
        general open source communities by means of
        <Link href="https://oss-compass.org/">OSS Compass</Link>.
      </Paragraph>
      <Title>Quick Start</Title>
      <Paragraph>
        <Link href="https://oss-compass.org/docs/quick-start">Quick Start</Link>
      </Paragraph>
      <Title>Communication</Title>
      <Paragraph>
        We have multiple communication channels such as chat, issues, etc. You
        can refer to
        <Link href="https://github.com/oss-compass/community/tree/main/communication">
          this page
        </Link>
        .
      </Paragraph>
    </div>
  );
};

export default Introduce;
