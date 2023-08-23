import { FaInfoCircle } from 'react-icons/fa';

const LabNotice = () => {
  return (
    <div className="mb-4 flex items-center rounded border border-[#DDCAA0] bg-[#FFEBBC] py-2 px-3 text-sm text-[#876E35]">
      <FaInfoCircle className="mr-2 text-[#F9A001]" /> Based on
      <span className="ml-2 font-bold">Starter Project Health</span>, an
      experimental CHAOSS model in Lab,
    </div>
  );
};

export default LabNotice;
