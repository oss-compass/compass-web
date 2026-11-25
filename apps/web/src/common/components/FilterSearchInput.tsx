import { SearchOutlined } from '@ant-design/icons';
import { Input, type InputProps } from 'antd';

type FilterSearchInputProps = Pick<
  InputProps,
  'onChange' | 'placeholder' | 'style' | 'value'
>;

const FilterSearchInput = ({
  placeholder,
  style,
  ...props
}: FilterSearchInputProps) => (
  <Input
    {...props}
    allowClear
    aria-label={placeholder}
    placeholder={placeholder}
    prefix={
      <SearchOutlined aria-hidden="true" className="mr-1 text-slate-500" />
    }
    style={{ maxWidth: '100%', ...style }}
    className="h-8 !border-slate-300 !bg-white focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 [&.ant-input-affix-wrapper]:!rounded-lg"
  />
);

export default FilterSearchInput;
