import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  useFieldArray,
  useFormContext,
  RegisterOptions,
} from 'react-hook-form';
import { CreateFields } from './type';
import classnames from 'classnames';

type ArrayFieldName = Exclude<keyof CreateFields, 'projectName'>;

const InputFieldArray: React.FC<{
  name: ArrayFieldName;
  label: string;
  registerOptions: RegisterOptions;
  disable?: boolean;
  placeholder: string;
}> = (props) => {
  const { label, name, registerOptions, disable = false, placeholder } = props;
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
    <div className="mt-10 mb-10">
      <label className="mb-4 inline-block text-xl font-medium">{label}</label>
      <div>
        {fields.map((item, index) => {
          const { error } = getFieldState(`${name}.${index}.value`);
          return (
            <div key={item.id} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder={placeholder}
                  disabled={disable}
                  {...register(`${name}.${index}.value`, registerOptions)}
                  className={classnames(
                    'daisy-input-bordered daisy-input h-12 flex-1 border-2  px-4 text-base outline-none',
                    [
                      Boolean(error?.message)
                        ? 'border-red-500'
                        : 'border-black',
                    ]
                  )}
                />
                <div className="ml-5 flex w-16 items-center">
                  {fields.length > 1 && (
                    <button
                      type="button"
                      className="text-primary"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              {error?.message && (
                <p className="p-1 text-red-500">{error.message}</p>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="flex items-center text-primary"
          onClick={() => append({ value: '' })}
        >
          <AiOutlinePlus /> Add repository
        </button>
      </div>
    </div>
  );
};

export default InputFieldArray;
