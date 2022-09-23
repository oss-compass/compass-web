import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  useFieldArray,
  useFormContext,
  RegisterOptions,
} from 'react-hook-form';
import { CreateFields } from './type';

type ArrayFieldName = Exclude<keyof CreateFields, 'projectName'>;

const InputFieldArray: React.FC<{
  name: ArrayFieldName;
  label: string;
  registerOptions: RegisterOptions;
}> = (props) => {
  const { label, name, registerOptions } = props;
  const { register, control, getFieldState, formState } =
    useFormContext<CreateFields>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name,
    }
  );

  // reactive to error state updated
  const { error: _ } = getFieldState(name, formState);

  return (
    <div className="mb-10 flex">
      <label className="w-60">{label}</label>
      <div>
        {fields.map((item, index) => {
          const { error } = getFieldState(`${name}.${index}.value`);
          return (
            <div key={item.id} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type here"
                  {...register(`${name}.${index}.value`, registerOptions)}
                  className="input input-bordered input-sm w-80 "
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline btn-warning btn-sm ml-4 px-2"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
              {error?.message && (
                <p className="p-1 text-red-500">{error.message}</p>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="btn btn-outline btn-sm flex items-center"
          onClick={() => append({ value: '' })}
        >
          <AiOutlinePlus /> Add repository
        </button>
      </div>
    </div>
  );
};

export default InputFieldArray;
