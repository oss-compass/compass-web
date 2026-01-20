import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@oss-compass/ui';

const ProjectInput = ({
  values,
  onChange,
  placeholder,
  disabled,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  disabled?: boolean;
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const add = () => {
    const v = text.trim();
    if (!v) return;
    if (values.includes(v)) {
      setText('');
      return;
    }
    onChange([...values, v]);
    setText('');
  };

  return (
    <div className={disabled ? 'opacity-60' : ''}>
      <div className="mb-3 flex gap-2">
        <input
          className="w-full rounded border px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (!disabled) add();
            }
          }}
        />
        <Button size="sm" disabled={disabled} onClick={add}>
          {t('common:btn.add')}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <div
            key={v}
            className="flex items-center gap-2 rounded border bg-white px-2 py-1"
          >
            <span className="max-w-[260px] truncate">{v}</span>
            <button
              className="text-xs text-gray-500"
              type="button"
              disabled={disabled}
              onClick={() => {
                onChange(values.filter((x) => x !== v));
              }}
            >
              {t('common:btn.delete')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectInput;
