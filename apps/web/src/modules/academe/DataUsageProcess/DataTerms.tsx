import React from 'react';
import { useTranslation } from 'react-i18next';

const DataTerms = () => {
  const { i18n } = useTranslation();
  const zhTerms = (
    <div className="max-w-[920px] p-4">
      <h1 className="mb-10 text-center text-2xl font-semibold">
        OSS Compass 数据使用申请
      </h1>
      <h2 className="my-4 text-xl font-semibold">提交申请</h2>
      <p className="mb-6">
        如果你的项目或学术研究需要使用 OSS Compass 数据，请先给 OSS Compass
        社区邮箱 contact@oss-compass.org 发邮件申请，并在邮件中提供以下信息：
        <br />
        <br />
        1. 你本人及所属机构简介。 <br />
        2. 你的项目或学术研究名称及简介。 <br />
        3. 你的项目或学术研究使用 OSS Compass 数据的目的。 <br />
        4. 你的项目或学术研究使用 OSS Compass 数据的类型、数量。 <br />
        5. 你的项目或学术研究的成果发布形式。
      </p>
      <h2 className="my-4 text-xl font-semibold">申请审核</h2>
      <p className="mb-6">
        1.
        收到你的数据使用申请邮件后，我们会对你的项目或学术研究进行全面了解并审核，以确认你的项目或学术研究从
        OSS Compass
        获取数据不会触犯相关法律法规。否则，我们将不能为你提供数据使用服务。
        <br />
        2. OSS Compass 的数据由开源中国托管，因此将由开源中国为你提供 OSS
        Compass
        的数据使用授权服务。我们需要与你确认接收该授权的主体是你本人、你的项目或者你所属机构，以便签署授权协议。
        <br />
        3. 我们将在收到申请 10 个工作日内完成审核并答复。
      </p>
      <h2 className="my-4 text-xl font-semibold">签署授权协议</h2>
      <p className="mb-6">
        完成以上审核后，我们会根据你的项目或学术研究类型签署相应的数据使用授权协议。
      </p>
      <h2 className="my-4 text-xl font-semibold">商业项目</h2>
      <p className="mb-6">
        1. 你的商业项目使用OSS Compass的数据可通过付费或者项目合作的方式进行。
        <br />
        2.
        其中项目信息不方便公开的可以采用付费形式，付费交易的乙方为你的项目所属商业机构，甲方为开源中国。
        <br />
        3. 项目信息可以公开的可以通过项目合作形式进行，这种情况需要同意 OSS
        Compass 使用该项目进行宣传推广以及可以免费使用该项目成果。 <br />
        4. 需要在项目公开文档中注明数据来源为 OSS Compass。
        <br /> 5. 具体细节请查看底部协议附件。
      </p>
      <h2 className="my-4 text-xl font-semibold">开源项目</h2>
      <p className="mb-6">
        1. 你的开源项目需要在项目公开产品或文档中注明数据来源为OSS Compass。
        <br />
        2. 如果你的开源项目使用 OSS Compass
        数据提供商业产品或服务，需要按照以上商业项目进行授权签署。 <br />
        3. 具体细节请查看底部协议附件。
      </p>
      <h2 className="my-4 text-xl font-semibold">学术研究</h2>
      <p className="mb-6">
        1. 你的学术研究使用OSS Compass的数据可以通过学术合作的方式进行。
        <br />
        2. 需要同意OSS Compass使用该学术研究进行宣传推广。
        <br />
        3. 需要在学术研究论文中注明数据来源为OSS Compass。
        <br />
        4. 如果该学术研究成果可进行工程化部署，在不侵犯知识产权的情况下，请同意
        OSS Compass 享有此成果的使用权。
        <br />
        5. 具体细节请查看底部协议附件。
      </p>
      <h3 className="my-4 text-lg font-semibold">
        附：
        <a
          className="underline"
          download
          target=""
          href="/pdf/OSS Compass 项目合作框架协议书.pdf"
        >
          OSS Compass 项目合作框架协议书.pdf
        </a>
      </h3>
    </div>
  );
  const enTerms = (
    <div className="max-w-[920px] p-4">
      <h1 className="mb-10 text-center text-2xl font-semibold">
        OSS Compass Data Usage Application Process
      </h1>
      <h2 className="my-4 text-xl font-semibold">Application Submission</h2>
      <p className="mb-6">
        If your project or academic research requires the use of OSS Compass
        data, please first send an application email to the OSS Compass
        community mailbox at contact@oss-compass.org and provide the following
        information in your email:
        <br />
        <br />
        1. A brief introduction of yourself and your institution.
        <br />
        2. The name and summary of your project or academic research.
        <br />
        3. The purpose of using OSS Compass data in your project or academic
        research.
        <br />
        4. The type and quantity of OSS Compass data you intend to use in your
        project or academic research.
        <br />
        5. The form in which the results of your project or academic research
        will be published.
      </p>
      <h2 className="my-4 text-xl font-semibold">Application Review</h2>
      <p className="mb-6">
        1. After receiving your data usage application email, we will thoroughly
        understand and review your project or academic research to confirm that
        obtaining data from OSS Compass will not violate any relevant laws and
        regulations. Otherwise, we will not be able to provide you with data
        usage services.
        <br />
        2. OSS Compass data is hosted by OSChina, therefore, OSChina will
        provide you with the OSS Compass data usage authorization service. We
        need to confirm with you whether the recipient of this authorization is
        yourself, your project, or your institution, in order to sign the
        authorization agreement.
        <br />
        3. We will complete the review and respond within 10 working days of
        receiving the application.
      </p>
      <h2 className="my-4 text-xl font-semibold">
        Signing the Authorization Agreement
      </h2>
      <p className="mb-6">
        After the above review is completed, we will sign the corresponding data
        usage authorization agreement with you according to the type of your
        project or academic research.
      </p>
      <h2 className="my-4 text-xl font-semibold">Commercial Projects</h2>
      <p className="mb-6">
        1. Your commercial project can access OSS Compass data either through
        payment or project cooperation.
        <br />
        2. For projects where information cannot be publicly disclosed, a
        payment method can be adopted, with the payer being the commercial
        institution to which your project belongs, and the payee being OSChina.
        <br />
        3. Projects that can disclose information can proceed through project
        cooperation, which requires agreeing to OSS Compass using the project
        for promotion and being able to use the project&#39;s results for free.
        <br />
        4. It is necessary to state in the project&#39;s public documents that
        the data source is OSS Compass.
        <br />
        5. For specific details, please see the agreement below.
      </p>
      <h2 className="my-4 text-xl font-semibold">Open Source Projects</h2>
      <p className="mb-6">
        1. Your open source project needs to mention OSS Compass as the data
        source in public products or documents.
        <br />
        2. If your open source project uses OSS Compass data to provide
        commercial products or services, it needs to follow the authorization
        signing process for commercial projects.
        <br />
        3. For specific details, please see the agreement below.
      </p>
      <h2 className="my-4 text-xl font-semibold">Academic Research</h2>
      <p className="mb-6">
        1. Your academic research can use OSS Compass data through academic
        cooperation.
        <br />
        2. You need to agree to OSS Compass using the academic research for
        promotion.
        <br />
        3. It is necessary to mention OSS Compass as the data source in academic
        research papers.
        <br />
        4. If the results of the academic research can be deployed in
        engineering without infringing intellectual property rights, please
        agree to OSS Compass having the right to use these results.
        <br />
        5. For specific details, please see the agreement below.
      </p>
      <h3 className="my-4 text-lg font-semibold">
        <a
          className="underline"
          download
          target=""
          href="/pdf/OSS Compass Project Cooperation Framework Agreement.pdf"
        >
          OSS Compass Project Cooperation Framework Agreement.pdf
        </a>
      </h3>
    </div>
  );
  if (i18n.language === 'en') {
    return enTerms;
  } else {
    return zhTerms;
  }
};

export default DataTerms;
