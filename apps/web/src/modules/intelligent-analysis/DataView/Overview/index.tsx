import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { IoIosArrowForward } from 'react-icons/io';

interface ProjectData {
  name: string;
  developers: number;
  organizations: number;
  slug: string;
}

const projectsData: ProjectData[] = [
  {
    name: 'Ollama',
    developers: 12271,
    organizations: 2589,
    slug: 'ollama',
  },
  {
    name: 'vLLM',
    developers: 11418,
    organizations: 2030,
    slug: 'vllm',
  },
  {
    name: 'PyTorch',
    developers: 6366,
    organizations: 2012,
    slug: 'pytorch',
  },
  {
    name: 'LLaMA-Factory',
    developers: 4087,
    organizations: 628,
    slug: 'llama-factory',
  },
  {
    name: 'ONNX Runtime',
    developers: 2594,
    organizations: 525,
    slug: 'onnxruntime',
  },
  {
    name: 'Servers',
    developers: 1448,
    organizations: 754,
    slug: 'servers',
  },
  {
    name: 'Avalonia',
    developers: 1242,
    organizations: 292,
    slug: 'avalonia',
  },
  {
    name: 'Triton',
    developers: 1015,
    organizations: 259,
    slug: 'triton',
  },
  {
    name: 'vLLM-Ascend',
    developers: 531,
    organizations: 89,
    slug: 'vllm-ascend',
  },
  {
    name: 'JAX',
    developers: 493,
    organizations: 274,
    slug: 'jax',
  },
  {
    name: 'XLA',
    developers: 337,
    organizations: 42,
    slug: 'xla',
  },
  {
    name: 'Aibrix',
    developers: 92,
    organizations: 57,
    slug: 'aibrix',
  },
  {
    name: 'A2A',
    developers: 56,
    organizations: 26,
    slug: 'a2a',
  },

  {
    name: 'Flutter',
    developers: 56924,
    organizations: 14910,
    slug: 'flutter',
  },
  {
    name: 'React Native',
    developers: 48371,
    organizations: 16137,
    slug: 'react-native',
  },
  {
    name: 'Chromium',
    developers: 12329,
    organizations: 3345,
    slug: 'chromium',
  },
  {
    name: 'Electron',
    developers: 4450,
    organizations: 1636,
    slug: 'electron',
  },
  {
    name: 'KMP OH',
    developers: 1915,
    organizations: 835,
    slug: 'kmp-oh',
  },
  {
    name: 'Ionic',
    developers: 1712,
    organizations: 713,
    slug: 'ionic',
  },
  {
    name: 'CEF',
    developers: 216,
    organizations: 61,
    slug: 'cef',
  },
];

const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  const { t } = useTranslation('intelligent_analysis');
  const router = useRouter();

  const normalStyle =
    'flex h-full bg-[#ffffff] cursor-pointer flex-col rounded border p-6 shadow hover:shadow-xl md:gap-4';
  const normalTitleStyle = 'text-lg font-semibold';
  const normalDescStyle = 'mt-3 h-[60px] text-sm leading-5 text-[#7b7c86]';
  const normalLinkStyle =
    'text-primary mt-6 flex items-center gap-2 font-semibold text-sm';

  return (
    <div
      className={normalStyle}
      onClick={() => {
        router.push(`/intelligent-analysis/overview/${project.slug}`);
      }}
    >
      <div className="mt-2 flex items-center">
        <span className={normalTitleStyle}>{project.name}</span>
      </div>

      <div className={normalDescStyle}>
        <div className="space-y-2 text-[#868690]">
          <div className="flex items-center">
            <span className="text-sm">
              {project.developers.toLocaleString()}
            </span>
            <span className="ml-1 text-xs">{t('overview_page.developers')}</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm ">
              {project.organizations.toLocaleString()}
            </span>
            <span className="ml-1 text-xs">{t('overview_page.organizations')}</span>
          </div>
        </div>
      </div>

      <div className={normalLinkStyle}>
        {t('overview_page.view_details')} <IoIosArrowForward className="mt-[1px]" />
      </div>
    </div>
  );
};

const Overview: React.FC = () => {
  const { t } = useTranslation('intelligent_analysis');

  return (
    <div className=" mx-auto max-w-7xl bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {t('overview_page.title')}
        </h1>
        <p className="text-gray-600">
          {t('overview_page.description')}
        </p>
      </div>
      <div className="mb-8 text-2xl font-medium">{t('overview_page.projects')}</div>
      <div className="flex flex-col gap-6 pb-16">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
