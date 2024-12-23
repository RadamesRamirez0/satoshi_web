import { CheckIcon, ClipboardIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import SimpleCard from '@/modules/common/shared-ui/components/simpleCard';
import { Button } from '@/modules/common/ui/components/button';
import { cn } from '@/modules/common/ui/lib/utils';

const Clipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('Clipboard');

  useEffect(() => {
    if (!copied) {
      return;
    }

    const interval = setInterval(() => {
      setCopied(false);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [copied]);

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => {
        setCopied(true);
        void navigator.clipboard.writeText(text);
      }}
      className='relative'
    >
      {copied && (
        <SimpleCard className='absolute -top-10 px-2 py-1 w-fit bg-muted'>
          {t('copied')}
        </SimpleCard>
      )}
      <ClipboardIcon className={cn('h-5 w-5', copied && 'text-primary')} />
      {copied && <CheckIcon className='size-5 absolute text-primary' />}
    </Button>
  );
};

export default Clipboard;
