import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUserCircle } from 'react-icons/fa';

const User = () => {
  const { reload } = useRouter();

  return (
    <div className="group relative mx-5 flex h-full items-center transition">
      <div className="flex h-[32px] cursor-pointer items-center justify-center bg-info px-3 group-hover:bg-[#333333]">
        <FaUserCircle />
      </div>

      <div className="absolute top-[100%] right-0 z-dropdown hidden w-[160px] group-hover:block">
        <div className="mt-[2px] bg-black/90 text-white">
          <Link href="/report">
            <div className="flex cursor-pointer border-b border-white/20 py-4 pl-6 text-center last:border-b-0 hover:bg-[#333333]">
              我的订阅
            </div>
          </Link>

          <Link href="/settings">
            <div className="flex cursor-pointer border-b border-white/20 py-4 pl-6 text-center last:border-b-0 hover:bg-[#333333]">
              账号设置
            </div>
          </Link>

          <div className="flex cursor-pointer border-b border-white/20 py-4 pl-6 text-center last:border-b-0 hover:bg-[#333333]">
            退出
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
