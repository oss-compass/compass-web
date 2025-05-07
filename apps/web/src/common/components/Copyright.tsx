import React from 'react';
import Link from 'next/link';
import { Center } from '@common/components/Layout';
import Twitter from '@public/images/logos/twitter.svg';
import WeChatAccount from '@public/images/logos/WeChatAccount.svg';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';

interface CopyrightProps {
  dark?: boolean;
}
const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#ffffff',
        },
        arrow: {
          color: '#ffffff',
        },
      },
    },
  },
});
const Copyright = ({ dark = false }: CopyrightProps) => {
  const { t } = useTranslation();

  return (
    <div className="h-[78px] w-full bg-gray-100 md:px-4">
      <Center className="flex h-full items-center justify-between">
        <div className="flex flex-col justify-center text-gray-500">
          <p className="text-xs ">
            Copyright © {new Date().getFullYear()} OSS Compass. All Rights
            Reserved.
          </p>
        </div>
        <div className="flex">
          <ThemeProvider theme={theme}>
            <Tooltip
              sx={{ bgcolor: 'white' }}
              title={
                <>
                  <Image
                    width={200}
                    height={200}
                    src={'/images/home/WeChatQRCode.jpg'}
                    unoptimized
                    alt={''}
                  />
                  <div className="mb-1 w-48 text-center text-sm text-black">
                    {t('home:scan_the_code_to_follow')}
                  </div>
                </>
              }
              arrow
              placement="top"
            >
              <div>
                <WeChatAccount className="h-6 w-6 cursor-pointer" />
              </div>
            </Tooltip>
          </ThemeProvider>
          <Link
            href="https://twitter.com/OssCompass"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="ml-4 h-6 w-6 cursor-pointer" />
          </Link>
        </div>
      </Center>
    </div>
  );
};

export default Copyright;
