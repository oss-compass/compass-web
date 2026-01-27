import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import type { OsBoardDashboardType } from '../../types';

export interface DashboardFormValues {
  name: string;
  type: OsBoardDashboardType;
  projects: string[];
  competitors: string[];
  compareMode: boolean;
  metricIds: string[];
}

interface UseDashboardFormStateProps {
  initialValues?: Partial<DashboardFormValues>;
  onSubmit: (values: DashboardFormValues) => void;
  metricIds: string[];
}

export const useDashboardFormState = ({
  initialValues,
  onSubmit,
  metricIds,
}: UseDashboardFormStateProps) => {
  const { t } = useTranslation();

  const [name, setName] = useState(initialValues?.name || '');
  const [type, setType] = useState<OsBoardDashboardType>(
    initialValues?.type || 'project'
  );
  const [compareMode, setCompareMode] = useState(
    initialValues?.compareMode || false
  );

  // Split state for projects and competitors by dashboard type
  const [repoProjects, setRepoProjects] = useState<string[]>(
    initialValues?.type === 'project' ? initialValues.projects || [] : []
  );
  const [communityProjects, setCommunityProjects] = useState<string[]>(
    initialValues?.type === 'community' ? initialValues.projects || [] : []
  );
  const [repoCompetitors, setRepoCompetitors] = useState<string[]>(
    initialValues?.type === 'project' ? initialValues.competitors || [] : []
  );
  const [communityCompetitors, setCommunityCompetitors] = useState<string[]>(
    initialValues?.type === 'community' ? initialValues.competitors || [] : []
  );

  const projects = type === 'project' ? repoProjects : communityProjects;
  const setProjects = (vals: string[]) => {
    if (type === 'project') setRepoProjects(vals);
    else setCommunityProjects(vals);
  };

  const competitors =
    type === 'project' ? repoCompetitors : communityCompetitors;
  const setCompetitors = (vals: string[]) => {
    if (type === 'project') setRepoCompetitors(vals);
    else setCommunityCompetitors(vals);
  };

  const validateAndSubmit = () => {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push(t('os_board:create.validation.name_required'));
    }
    if (!type) {
      errors.push(t('os_board:create.validation.type_required'));
    }
    if (projects.length === 0) {
      errors.push(t('os_board:create.validation.projects_required'));
    }
    if (metricIds.length === 0) {
      errors.push(t('os_board:create.validation.metrics_required'));
    }

    if (errors.length > 0) {
      const errorMsg = `${t('os_board:create.validation.title')} ${errors.join(
        '、'
      )}`;
      toast.error(errorMsg, { duration: 4000 });
      return;
    }

    onSubmit({
      name: name.trim(),
      type,
      projects,
      competitors,
      compareMode,
      metricIds,
    });
  };

  return {
    name,
    setName,
    type,
    setType,
    compareMode,
    setCompareMode,
    projects,
    setProjects,
    competitors,
    setCompetitors,
    validateAndSubmit,
  };
};
