import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import uniq from 'lodash/uniq';
import {
  useFieldArray,
  useFormContext,
  RegisterOptions,
} from 'react-hook-form';
import { CreateFields } from './type';
import { getLastPathSegment, getPathname } from '@common/utils';
import styles from './index.module.css';
import classnames from 'classnames';

type ArrayFieldName = keyof CreateFields;

const SelectFieldArray: React.FC<{
  name: ArrayFieldName;
  label: string;
  registerOptions: RegisterOptions;
}> = (props) => {
  const { label, name, registerOptions } = props;
  const { register, watch, getFieldState, formState } =
    useFormContext<CreateFields>();

  const { error } = getFieldState(name, formState);

  const softwareArtifactProjects = watch('softwareArtifactProjects');
  const communityProject = watch('communityProject');

  const softwareArtifactUrls = softwareArtifactProjects
    .map((item) => item.value.trim())
    .filter(Boolean);
  const communityUrls = communityProject
    .map((item) => item.value.trim())
    .filter(Boolean);

  const options = uniq([...softwareArtifactUrls, ...communityUrls])
    .map(getPathname)
    .filter(Boolean);

  if (softwareArtifactUrls.length >= 1 && communityUrls.length >= 1) {
    return (
      <div className="mt-10 mb-10">
        <label className="mb-4 inline-block text-xl font-medium">{label}</label>
        <div>
          <div className="mb-4">
            <div className="flex">
              <select
                className={classnames(
                  'daisy-select  h-12 flex-1  border-2 border-black text-base outline-none',
                  styles.select
                )}
                {...register(name, registerOptions)}
              >
                {options.map((url) => {
                  return <option key={url}>{url}</option>;
                })}
              </select>
              <div className="ml-5 w-16" />
            </div>
            {error?.message && (
              <p className="p-1 text-red-500">{error.message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SelectFieldArray;
