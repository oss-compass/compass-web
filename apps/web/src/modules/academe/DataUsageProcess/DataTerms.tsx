import React from 'react';
import { useTranslation } from 'react-i18next';

const DataTerms = () => {
  const { i18n } = useTranslation();
  const zhTerms = (
    <div className="max-w-[920px] p-4">
      <h1 className="mb-10 text-center text-2xl font-semibold">
        OSS Compass 数据使用流程
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
        4. 需要在项目公开文档中注明数据来源为 OSS Compass。5. 5.
        具体细节请查看底部协议附件。
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
        <a download target="" href="/pdf/OSS Compass 项目合作框架协议书.pdf">
          OSS Compass 项目合作框架协议书.pdf
        </a>
      </h3>
    </div>
  );
  return zhTerms;
  // if (i18n.language === 'en') {
  //   return (
  //     <div className="max-w-[920px] p-4">
  //       <h1 className="mb-10 text-center text-2xl font-semibold">
  //         Terms of Use for OSS Compass Lab
  //       </h1>
  //       <p className="mb-6">
  //         {`Welcome to OSS Compass Lab! OSS Compass Lab (hereinafter referred to
  //         as the "Platform") is an open source community evaluation metrics
  //         model incubator provided by the OSS Compass, an open source project.
  //         This incubator is made available to users in the form of a SaaS
  //         service. Based on the data analysis results of over 20,000 open source
  //         projects, the Platform offers users a dataset that includes more than
  //         200 project categories, over 100 evaluation metrics, and customizable
  //         algorithms. Users can quickly create and validate metrics models of
  //         their interest using this dataset, which can be general models for
  //         assessing open source community health or evaluation metrics models
  //         tailored to specific domains.`}
  //       </p>
  //       <p className="mb-6">
  //         {`The following are the legal agreement terms between you ("you" or
  //         "your") and OSS Compass, as well as its owner, Shenzhen OSSENET
  //         Technology Co., Ltd. ("we" or "us" or "our"). The term "You/User"
  //         refers to any natural person or legal entity that accesses or has
  //         accessed and used the Platform. By accessing or using the dataset
  //         ("Content") and model creation features ("Features") provided by the
  //         Platform, you agree to abide by and be bound by the terms ("Terms of
  //         Use") related to your access and use of the Platform outlined below.
  //         If you do not accept any term of these Terms of Use, you should not
  //         use this Platform.`}
  //       </p>
  //       <p className="mb-6">
  //         The Platform may modify the Terms of Use at any time without further
  //         notice. The revised Terms of Use will be effective upon publication.
  //         You can view the latest Terms of Use at{' '}
  //         <a
  //           className="underline underline-offset-2"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           href="https://oss-compass.org/"
  //         >
  //           https://oss-compass.org/
  //         </a>
  //         .
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">
  //         1. Compliance with Other Relevant Terms
  //       </h2>
  //       <p className="mb-6">
  //         The content and features of the Platform are provided through the OSS
  //         Compass website. When accessing or using this Platform, you must also
  //         comply with the Terms of Use and Privacy Policy of OSS Compass website
  //         at{' '}
  //         <a
  //           className="underline underline-offset-2"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           href="https://oss-compass.org/"
  //         >
  //           https://oss-compass.org
  //         </a>
  //         .
  //       </p>
  //       <p className="mb-6">
  //         Certain features or content provided by the Platform may be subject to
  //         additional rules, guidelines, license agreements, user agreements, or
  //         other terms and conditions for your access or use of such features or
  //         content. In case of conflict or inconsistency between these Terms of
  //         Use and the rules, guidelines, license agreements, user agreements, or
  //         other terms and conditions specific to certain Platform features or
  //         content, the rules, guidelines, license agreements, user agreements,
  //         or other terms and conditions specific to certain Platform features or
  //         content shall take precedence in your access or use.
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">2. Platform Usage</h2>
  //       <p className="mb-6">
  //         You may need to create an account to access certain features of the
  //         Platform. You are responsible for maintaining the security of your
  //         account information and for all activities that occur under your
  //         account.
  //       </p>
  //       <p className="mb-6">
  //         When creating an account, you must provide us with the latest,
  //         complete, and accurate information as required by the registration
  //         form to complete the registration process. You need to choose an
  //         appropriate password and username according to the specified rules.
  //         Password-protected content or certain features are accessible and
  //         usable only by authorized users. You agree not to share your password,
  //         account information, or access to the Platform with anyone else. You
  //         are responsible for maintaining the confidentiality of your password
  //         and account information, and you are accountable for all activities
  //         that occur through the use of your password or account, or due to
  //         accessing the Platform. You agree to promptly notify the Platform if
  //         you suspect unauthorized or unauthorized use of your password or
  //         account.
  //       </p>
  //       <p className="mb-6">
  //         You agree not to use the Platform in any way that could damage,
  //         disable, overload, or impair OSS Compass website. You agree not to
  //         attempt unauthorized access to or use of the content or features of
  //         the Platform. You agree not to interfere with or attempt to interfere
  //         with the normal operation of the Platform or any other Platform
  //         account, or OSS Compass website. You agree not to use any robots,
  //         scrapers, or other automated means to access OSS Compass website or
  //         any Platform account without explicit written permission from OSS
  //         Compass.
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">
  //         3. Content and Intellectual Property Rights
  //       </h2>
  //       <p className="mb-6">
  //         The content and features provided by the Platform, including text,
  //         graphics, and other materials, are owned by OSS Compass or its
  //         licensors. You may not use, copy, modify, distribute, or otherwise
  //         exploit these materials without prior written consent.
  //       </p>
  //       <p className="mb-6">
  //         {`You agree that you will only upload, share, publish, transmit content
  //         that you have the right to share via the Platform, and you grant the
  //         Platform all licenses and rights specified here. By sharing content,
  //         you grant the Platform a global, perpetual, royalty-free, irrevocable,
  //         non-exclusive, fully sublicensable license to use, copy, modify,
  //         adapt, translate, publish, publicly perform, publicly display,
  //         broadcast, transmit, and distribute the content for any purpose, in
  //         any form, medium, or technology. This includes the right to
  //         incorporate or implement the content into any Platform products or
  //         services. You warrant: (1) you have the rights and permissions to
  //         grant this license; (2) the Platform's exercise of the rights granted
  //         under this license will not infringe or otherwise violate any
  //         third-party rights; (3) all moral rights in the content have been
  //         waived to the fullest extent permitted by law.`}
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">4. Prohibited Activities</h2>
  //       <p className="mb-6">
  //         You agree that you will not:
  //         <p>
  //           {` - Share any content through the Platform that is: (1) false or
  //           misleading; (2) defamatory, derogatory, insulting, or harassing to
  //           others, or constitutes personal attacks; (3) infringes upon the
  //           privacy of others or contains, reproduces, or transmits
  //           confidential, sensitive, or personal information of others; (4)
  //           promotes bias, racism, hatred, or harm against any group or
  //           individual; (5) contains obscene or vulgar content; (6) infringes
  //           upon or promotes the infringement of others' rights, including
  //           intellectual property rights; (7) rights and licenses you are not
  //           authorized to share or grant; (8) violates or encourages the
  //           violation of any applicable laws or regulations; (9) solicits funds,
  //           promotes goods, or advertises; (10) contains any components intended
  //           to limit or damage computer functionality. If you transmit or upload
  //           content intended to cause harm, the Platform may report you to the
  //           relevant authorities and may take action to the fullest extent
  //           permitted by applicable law.`}
  //         </p>
  //         <p>
  //           {`- Engage in activities that violate relevant laws or regulations of
  //           the People's Republic of China through accessing or using the
  //           Platform.`}
  //         </p>
  //         <p>
  //           - Impersonate others or entities when accessing or using the
  //           Platform.
  //         </p>
  //         <p>
  //           - Reverse engineer, decompile, or otherwise attempt to derive the
  //           source code of the Platform.
  //         </p>
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">5. Disclaimer</h2>
  //       <p className="mb-6">
  //         {`The dataset and model creation features provided by the Platform for
  //         free are still under development, and the data from various publicly
  //         available sources on which they are based may be incomplete,
  //         inaccurate, or outdated. The Platform is provided "as is" and "as
  //         available". OSS Compass makes no express or implied warranties
  //         regarding the accuracy, reliability, or availability of the provided
  //         dataset.`}
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">
  //         6. Limitation of Liability
  //       </h2>
  //       <p className="mb-6">
  //         OSS Compass shall not be liable for any damage, loss of profits or
  //         revenue, whether directly or indirectly, or for any loss of data, use,
  //         reputation or other intangible assets, arising from your use of the
  //         Platform.
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">
  //         7. Modification and Termination
  //       </h2>
  //       <p className="mb-6">
  //         OSS Compass reserves the right to modify or terminate the dataset and
  //         model creation features provided without prior notice. We may also
  //         terminate or suspend your access to the Platform for any reason,
  //         including violation of these Terms of Use.
  //       </p>
  //       <p className="mb-6">
  //         The failure of the Platform to enforce or exercise any right or
  //         provision of these Terms of Use does not constitute a waiver of that
  //         right or provision. If any part or provision of these Terms of Use is
  //         found to be unenforceable, it may be modified to make the modified
  //         terms legal and enforceable to the fullest extent. The balance of
  //         these Terms of Use remains unaffected.
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">8. Applicable Law</h2>
  //       <p className="mb-6">
  //         {` All matters relating to your access to and use of the Platform, as
  //         well as any content provided or uploaded to the Platform through the
  //         Platform, shall be governed by the laws of the People's Republic of
  //         China and Shenzhen City, Guangdong Province of the People's Republic
  //         of China. Any dispute relating to your access to or use of the
  //         Platform shall be negotiated amicably with us. If no agreement can be
  //         reached, a lawsuit shall be filed with the court where we are located
  //         (Shenzhen City, Guangdong Province, People's Republic of China). You
  //         agree to submit to the jurisdiction of these courts.`}
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">9. Contact Information</h2>
  //       <p className="mb-6">
  //         If you have any questions or concerns about these Terms of Use, please
  //         contact us at contact@oss-compass.org .
  //       </p>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="max-w-[920px] p-4">
  //       <h1 className="mb-10 text-center text-2xl font-semibold">
  //         OSS Compass 实验室使用条款
  //       </h1>
  //       <p className="mb-6">
  //         欢迎使用 OSS Compass 实验室！OSS Compass 实验室（以下简称“平台”）是由
  //         OSS Compass 开源项目提供的开源社区度量模型孵化器，该孵化器以 SaaS
  //         服务的形式向用户开放。平台基于 20,000
  //         多个开源项目的数据分析结果，为用户提供了包含 200 多个项目类别、100
  //         多个评估指标以及自定义算法的数据集。用户可通过数据集快速创建和验证他们感兴趣的度量模型，这些模型可以是开源社区健康度评估通用模型，也可以是针对专有领域的评估模型。
  //       </p>
  //       <p className="mb-6">
  //         以下是您（“您”或“您的”）与 OSS Compass
  //         及其所有者深圳市奥思网络科技有限公司（“我们”或“我方”）之间的法律协议条款。“您/用户”一词指任何访问或曾经访问及使用平台的自然人或法人。通过访问或使用平台提供的数据集（“内容”）和模型创建功能（“功能”），您同意遵守以下有关您访问和使用平台的条款（“使用条款”）并受其约束。如果您不接受以下使用条款的任何条款，则您不应该使用本平台。
  //       </p>
  //       <p className="mb-6">
  //         平台可能随时修改使用条款，恕不另行通知。修订后的使用条款将在发布后生效。您可以在
  //         <a
  //           className="underline underline-offset-2"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           href="https://oss-compass.org/"
  //         >
  //           https://oss-compass.org
  //         </a>
  //         查看最新的使用条款。
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">1. 遵守其他相关条款</h2>
  //       <p className="mb-6">
  //         平台的内容和功能是通过 OSS Compass
  //         网站提供，您在访问或使用本平台时必须同时遵守 OSS Compass
  //         网站的使用条款和隐私政策（
  //         <a
  //           className="underline underline-offset-2"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           href="https://oss-compass.org/"
  //         >
  //           https://oss-compass.org
  //         </a>
  //         ）。
  //       </p>
  //       <p className="mb-6">
  //         平台的某些功能或某些提供的内容可能有适用于您访问或使用本平台该功能或内容的附加规则、指南、许可协议、用户协议或其他条款。如果这些使用条款与平台特定功能或特定内容的规则、指南、许可协议、用户协议或其他条款和条件之间存在冲突或不一致，则您的访问或使用应优先考虑平台特定功能或特定内容的规则、指南、许可协议、用户协议或其他条款和条件。
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">2. 平台使用</h2>
  //       <p className="mb-6">
  //         您可能需要创建帐户以访问平台的某些功能。您有责任保护您的帐户信息的安全性，并对在您的帐户下发生的所有活动负责。
  //       </p>
  //       <p className="mb-6">
  //         您在创建帐户时，必须按照注册表的要求向我们提供最新、完整和准确的信息，以完成注册过程。您需要按照指定规则选择适当的密码和用户名。仅限授权用户访问和使用平台的受密码保护内容或某些功能。您同意不与任何其他人分享您的密码、帐户信息或对平台的访问权限。您有责任维护密码和帐户信息的机密性，并且您对通过使用您的密码或帐户或因访问平台而发生的所有活动负责。您同意，如果您未经授权或未经本使用条款授权而使用您的密码或帐户，请立即通知平台。
  //       </p>
  //       <p className="mb-6">
  //         您同意不以任何可能损坏、禁用、超载或损害 OSS Compass
  //         网站的形式使用平台。您同意不会尝试未经授权访问或使用平台的内容或功能。您同意不干扰或试图干扰平台或其他任何平台帐户、OSS
  //         Compass 网站的正常运行。您同意未经 OSS Compass
  //         明确书面许可，不使用任何机器人、抓取工具或其他自动方式访问 OSS Compass
  //         网站或任何平台帐户。
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">3. 内容和知识产权</h2>
  //       <p className="mb-6">
  //         平台提供的内容和功能，包括文本、图形和其他材料，归 OSS Compass
  //         或其许可方所有。未经事先书面同意，您不得使用、复制、修改、分发或以其他方式利用这些材料。
  //       </p>
  //       <p className="mb-6">
  //         您同意您只会通过平台上传、共享、发布、发布、传输您有权共享的内容，并向平台授予此处规定的所有许可和权利。通过共享内容，您授予平台全球范围内的、永久的、免版税的、不可撤销的、非独占的、完全可再许可的许可，允许平台以任何目的、任何形式、媒介或技术使用、复制、修改、改编、翻译、发布、公开表演、公开展示、广播、传输和分发该内容。这包括但不限于将内容纳入或实施到任何平台产品或服务中的权利。您保证：（1）您拥有授予此许可的权利和权限；（2）平台行使根据本许可授予的权利不会侵犯或以其他方式违反任何第三方权利；（c）内容中的所有所谓精神权利均已在法律允许的最大范围内放弃。
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">4. 禁止行为</h2>
  //       <p className="mb-6">
  //         您同意：
  //         <p>
  //           -
  //           不会通过平台分享任何以下内容：（1）虚假或误导性的；（2）诽谤、贬损、侮辱或骚扰他人或构成人身攻击；（3）侵犯他人隐私或包含、复制或传输他人的机密、敏感或个人信息；（4）宣扬针对任何团体或个人的偏见、种族主义、仇恨或伤害；（5）淫秽或低俗内容；（6）侵犯或促进侵犯他人权利，包括知识产权：（7）您无权分享或授权的权利和许可；（8）违反或促使违反任何适用的法律或法规；（9）募集资金，促销商品或广告：（10）包含任何病毒或其他旨在限制或损害计算机功能的组件。如果您传输或上传意图造成损害的内容，平台可能会向相关当局举报您，并可能在适用法律的最大范围内采取行动。
  //         </p>
  //         <p>
  //           - 不通过访问或使用平台进行违反中华人民共和国相关法律或法规的活动。
  //         </p>
  //         <p>- 不会冒充他人或实体访问或使用平台。</p>
  //         <p>
  //           {' '}
  //           - 不对平台进行反向工程、反编译或以其他方式尝试推导平台的源代码。
  //         </p>
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">5. 免责声明</h2>
  //       <p className="mb-6">
  //         {`平台免费提供的数据集和模型创建功能尚在开发中，所基于的各种公开数据源的数据可能不完整、不准确或不及时。平台按"现状"和"可用性"提供。OSS
  //         Compass 对所提供的数据集的准确性、可靠性或可用性不作任何明示或暗示的保证。`}
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">6. 责任限制</h2>
  //       <p className="mb-6">
  //         OSS Compass
  //         对于您使用平台所产生的任何损害、利润或收入的损失，无论是直接还是间接引起的，以及任何数据、使用、商誉或其他无形资产的损失，概不负责。
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">7. 修改和终止</h2>
  //       <p className="mb-6">
  //         OSS Compass
  //         保留随时修改或终止所提供数据集和模型创建功能的权利，而无需事先通知。我们也可能出于任何原因终止或暂停您访问平台的权限，包括违反这些使用条款。
  //       </p>
  //       <p className="mb-6">
  //         平台未能行使或执行本使用条款中的任何权利或规定并不构成对该权利或规定的放弃。如果发现本使用条款的任何部分或规定无法执行，则可以修改该部分或规定以使修改后的使用条款合法且可执行。使用条款的平衡不受影响。
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">8. 适用法律</h2>
  //       <p className="mb-6">
  //         与您访问和使用平台以及通过平台提供或上传到平台的内容相关的所有事宜均应受中华人民共和国及中华人民共和国广东省深圳市法律管辖。与您访问或使用平台相关的任何争议均应与我方友好协商，协商不成的应该向我方所属地（中华人民共和国广东省深圳市）的法院提起诉讼。您同意接受这些法院的管辖。
  //       </p>
  //       <h2 className="my-4 text-xl font-semibold">9. 联系信息</h2>
  //       <p className="mb-6">
  //         如果您对这些使用条款有任何疑问或关注，请通过 contact@oss-compass.org
  //         与我们联系。
  //       </p>
  //     </div>
  //   );
  // }
};

export default DataTerms;
