import React from 'react';
import Image from 'next/image';
import { FiUsers } from 'react-icons/fi';
import Tooltip from '@common/components/Tooltip';
import { useTranslation } from 'next-i18next';
import { Title } from './components';

const data = [
  {
    avatar: '/images/about/陶先平@2x.png',
    name: '陶先平',
    intro: `南京大学教授、博士生导师<br/>兼任教育部大学计算机课程教学指导委员会委员、江苏省计算机学会教育工委主任。主要研究方向为群智认知、智能软件工程等。工作期间，主持或参与国家、省部级项目二十余项，发表学术论文百余篇。两次获国家科技进步二等奖；一次获国家教学成果二等奖。个人获宝钢优秀教师奖。`,
    tooltip: true,
  },
  {
    avatar: '/images/about/周峻松@2x.png',
    name: '周峻松',
    intro:
      '国家工业信息安全发展研究中心软件所开源技术研究部技术总监，主要研究领域为基础软件、开源软件，软件安全等。',
  },
  {
    avatar: '/images/about/红薯@2x.png',
    name: '红薯',
    intro: '开源中国创始人',
  },
  {
    avatar: '/images/about/高琨@2x.png',
    name: '高琨',
    intro: '华为工程师， 8 年开源软件治理相关工作经验',
  },
  {
    avatar: '/images/about/马红伟@2x.png',
    name: '马红伟',
    intro: `百度开源办公室产品运营经理 <br/>负责百度开源办公室日常运营工作，包括开源治理、社区合作、技术传播等。`,
  },
  {
    avatar: '/images/about/单致豪Mark@2x.png',
    name: 'Mark 单致豪',
    intro: `OpenCloudOS 社区秘书长，腾讯开源联盟主席<br/>专注在云原生、微服务、边缘计算、大数据、操作系统等领域的开源生态建设。为腾讯建立健康的开源生态努力，致力于以开源方式加速技术和产品的创新。作为腾源会导师，开展与开发者和开源组织的开源创新协作。`,
    tooltip: true,
  },
  {
    avatar: '/images/about/谭中意@2x.png',
    name: '谭中意',
    intro: `星策社区发起人 <br/>开源专家，企业智能化转型---星策社区发起人，在 Sun/百度/腾讯等有 20 余年开源开发、运营、治理经验，中国开源推进联盟副秘书长，Apache 开源软件基金会成员，Linux 基金会 AI & Data Outreach 主席。`,
    tooltip: true,
  },
  {
    avatar: '/images/about/王烨晖@2x.png',
    name: '王晔晖',
    intro: `华为 2012 实验室 - 开源管理中心<br/>华为工程师, LF CHAOSS Board<br/> 主要负责开源社区生态评估体系的构建和工程化落地的工作。在 LF CHAOSS 社区担任董事，负责开源社区健康度量的指标和模型构建工作。`,
    tooltip: true,
  },
  {
    avatar: '/images/about/汪亮@2x.png',
    name: '汪亮',
    intro: `博士，南京大学计算机科学与技术系副教授、硕士生导师。其研究领域主要包括计算机软件方法学、群体智能、移动和普适计算。近年来其研究重点方向是围绕开源软件社群以及无人机群等场景中群智行为的建模、认知、度量与激励方法。主持国家自然科学基金面上和青年项目等科研项目，参与科技创新2030-“新一代人工智能”重大项目等多项国家级项目。相关论文发表于《中国科学》、TMC、TKDE、UbiComp等国内和国际期刊与会议。他是CCF系统软件、CCF开源发展委员会执行委员。`,
    tooltip: true,
  },
  {
    avatar: '/images/about/余跃@2x.png',
    name: '余跃',
    intro: `博士，OpenI 启智开源社区负责人，CCF 开源发展委员会常务委员，主要从事开源生态、群体智能、开源大数据分析等相关领域的研究工作。`,
  },
  {
    avatar: '/images/about/周明辉@2x.png',
    name: '周明辉',
    intro: `北京大学计算机学院教授，北大博雅特聘教授，国家杰出青年基金获得者，CCF 开源发展委员会副主任。主要研究方向是软件工程、数据挖掘、智能推荐和开源开发。在国际顶级期刊和会议等发表 100 多篇论文，主要涉及开源贡献者行为度量、群体协作和开源生态机制机理以及智能推荐技术。多次获国际会议优秀论文奖。入选 2012 年教育部新世纪优秀人才计划；获 2015 年中创软件人才奖。两次获国家技术发明二等奖。多次担任软件工程国际顶级会议 ICSE、FSE 和 ASE 的 PC，是 SANER’2020 和 ASE’2024 的 PC CO-Chair 等。著名国际期刊 EMSE、JSS 及 JSME 的编委。领导起草了木兰宽松许可证 MulanPSL2 并获得国际 OSI 认证。`,
    tooltip: true,
  },
  {
    avatar: '/images/about/张盛翔@2x.png',
    name: '张盛翔/诺墨',
    intro:
      'Gitee 开源社区产品负责人，高级产品经理 <br/> 独立开发者，Drone.cool 站长，Laravel China 社区版主',
  },
];

const Board = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-20">
      <Title>{t('about:governing_board')}</Title>

      <div className="bg-[#FAFAFA] px-16 pt-16 pb-10">
        <div className="grid grid-cols-3 gap-7 md:grid-cols-1">
          {data.map((item) => {
            const introNode = (
              <div
                className="line-clamp-3 text-xs"
                dangerouslySetInnerHTML={{ __html: item.intro }}
              />
            );

            return (
              <div className="" key={item.name}>
                <div className="mb-4 h-[160px] w-[272px] overflow-hidden bg-gray-100">
                  {item.avatar && (
                    <Image src={item.avatar} width={272} height={160} alt="" />
                  )}
                </div>
                <div className="mb-1 font-medium">{item.name}</div>
                {item.tooltip ? (
                  <Tooltip
                    title={
                      <div
                        className="p-2"
                        dangerouslySetInnerHTML={{ __html: item.intro }}
                      />
                    }
                  >
                    {introNode}
                  </Tooltip>
                ) : (
                  introNode
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center">
          <a
            href={'#technical-committee'}
            className="mr-6 flex cursor-pointer items-center border border-solid border-black py-2 px-4 hover:bg-gray-100 "
          >
            <FiUsers />
            <span className="ml-2 font-medium">
              {t('about:technical_committee')}
            </span>
          </a>
          <a
            href={'#outreach-committee'}
            className="flex cursor-pointer  items-center border border-solid border-black py-2 px-4 hover:bg-gray-100"
          >
            <FiUsers />
            <span className="ml-2 font-medium">
              {t('about:outreach_committee')}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Board;
