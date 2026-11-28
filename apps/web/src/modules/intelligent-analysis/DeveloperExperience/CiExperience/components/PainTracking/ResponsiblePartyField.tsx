import React, { useId, useState } from 'react';
import { Alert, Button, Popover, Radio } from 'antd';
import { RESPONSIBLE_PARTIES, type ResponsibleParty } from './model';

const ResponsiblePartyField: React.FC<{
  current: string;
  disabled: boolean;
  operatorReady: boolean;
  error: string;
  clearError: () => void;
  onSave: (party: ResponsibleParty) => Promise<boolean>;
}> = ({ current, disabled, operatorReady, error, clearError, onSave }) => {
  const [open, setOpen] = useState(false);
  const labelId = useId();

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-rose-100 bg-white/70 px-3 py-1.5 text-sm leading-6"
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span id={labelId} className="font-medium text-slate-700">
          责任方
        </span>
        <span className="min-w-0 break-words font-semibold text-slate-700">
          {current}
        </span>
      </div>

      <Popover
        trigger="click"
        placement="bottomRight"
        title="选择责任方"
        open={open}
        destroyOnHidden
        onOpenChange={(next) => {
          if (!disabled) {
            if (next) clearError();
            setOpen(next);
          }
        }}
        content={
          <div className="w-40 space-y-2">
            <div role="radiogroup" aria-label="新责任方">
              <Radio.Group
                className="flex flex-col gap-2"
                disabled={disabled}
                options={RESPONSIBLE_PARTIES.map((party) => ({
                  label: party,
                  value: party,
                }))}
                value={current}
                onChange={async (event) => {
                  clearError();
                  const saved = await onSave(event.target.value);
                  if (saved || !operatorReady) setOpen(false);
                }}
              />
            </div>
            {error && <Alert type="error" showIcon message={error} />}
          </div>
        }
      >
        <Button
          size="small"
          autoInsertSpace={false}
          disabled={disabled}
          aria-expanded={open}
        >
          更改
        </Button>
      </Popover>
    </div>
  );
};

export default ResponsiblePartyField;
