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

  const options = uniq([...softwareArtifactUrls, ...communityUrls]).map(
    getPathname
  );

  if (softwareArtifactUrls.length >= 1 && communityUrls.length >= 1) {
    return (
      <div className="mb-10 flex">
        <label className="w-60">{label}</label>
        <div>
          <div className="mb-4">
            <div className="flex">
              <select
                className="select select-bordered w-60 max-w-xs"
                {...register(name, registerOptions)}
              >
                {options.map((url) => {
                  return <option key={url}>{url}</option>;
                })}
              </select>
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
