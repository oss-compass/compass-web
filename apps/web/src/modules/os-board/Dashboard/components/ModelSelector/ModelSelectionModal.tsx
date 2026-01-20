import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { Button, Input, Modal } from '@oss-compass/ui';
import classnames from 'classnames';
import { MODEL_CONFIGS } from '../../config/modelMetrics';

interface Model {
  id: string;
  name: string;
  groups: {
    id: string;
    name: string;
  }[];
}

// 临时状态管理
let tempSelectedModelIds: string[] = [];

interface ModelSelectionModalProps {
  open: boolean;
  onClose: () => void;
  selectedModelIds: string[];
  onConfirm: (selectedModelIds: string[]) => void;
}

const ModelSelectionModal: React.FC<ModelSelectionModalProps> = ({
  open,
  onClose,
  selectedModelIds,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setTempSelected(selectedModelIds);
      tempSelectedModelIds = [...selectedModelIds];
      setSearch('');
    }
  }, [open, selectedModelIds]);

  // 从公共配置生成模型数据，并应用国际化
  const allModels: Model[] = useMemo(() => {
    return MODEL_CONFIGS.map((config) => ({
      id: config.id,
      name: t(config.i18nKey),
      groups: config.metrics.map((m) => ({
        id: m.id,
        name: t(m.i18nKey),
      })),
    }));
  }, [t]);

  // 过滤模型
  const filteredModels = allModels.filter(
    (model) =>
      model.name.toLowerCase().includes(search.toLowerCase()) ||
      model.groups.some((metric) =>
        metric.name.toLowerCase().includes(search.toLowerCase())
      )
  );

  const toggleModel = (modelId: string) => {
    setTempSelected((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleSave = () => {
    onConfirm(tempSelected);
    onClose();
  };

  const count = tempSelected.length;

  const renderModelCard = (model: Model) => {
    const isSelected = tempSelected.includes(model.id);

    return (
      <div
        key={model.id}
        className={classnames(
          'flex min-h-16 items-center justify-between border border-[#CCCCCC] p-3',
          [
            isSelected
              ? ['border-blue-600', 'border-2', 'bg-smoke']
              : ['border'],
            'cursor-pointer',
          ]
        )}
        onClick={() => toggleModel(model.id)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <span className="text-sm font-medium">{model.name}</span>
          </div>
          <div className="mt-1 truncate text-xs text-[#585858]">
            包含 {model.groups.length} 个指标：
            {model.groups.map((m) => m.name).join('、')}
          </div>
        </div>
        <div className="pl-5">
          <input checked={isSelected} type="checkbox" onChange={() => {}} />
        </div>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0">
        <div
          className="absolute right-10 top-10 cursor-pointer p-2"
          onClick={onClose}
        >
          <GrClose />
        </div>

        <div className="flex h-full flex-col px-10 pt-8 md:px-2">
          <div className="mb-3 text-2xl font-medium">选择模型（可选）</div>
          <div className="mb-4 text-sm">已选择模型（{count}）</div>

          <div className="thin-scrollbar flex-1 overflow-auto pb-24 pl-4">
            <div className="grid grid-cols-1 gap-4 pr-2">
              {filteredModels?.map((model) => renderModelCard(model))}
            </div>
          </div>

          <div className="border-silver absolute bottom-0 left-0 right-0 flex h-20 items-center justify-between border-t bg-white px-9 text-sm">
            <div>提示：选择模型会自动添加该模型下的所有指标</div>
            <div>
              <Button className="min-w-[100px]" onClick={handleSave}>
                {t('common:btn.confirm')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModelSelectionModal;
