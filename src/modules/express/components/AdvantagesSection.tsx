import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const AdvantagesSection = async () => {
  const t = await getTranslations('Advantages');

  return (
    <section className='space-y-8 pt-32 flex gap-4'>
      <span className='flex-1 space-y-8'>
        <h2 className='text-5xl font-bold pb-8 '>{t('mainTitle')}</h2>
        <article className='space-y-2'>
          <h3 className='text-xl font-bold'>{t('firstTitle')}</h3>
          <p className='text-lg font-medium'>{t('firstContent')}</p>
        </article>
        <article className='space-y-2'>
          <h3 className='text-xl font-bold'>{t('secondTitle')}</h3>
          <p className='text-lg font-medium'>{t('secondContent')}</p>
        </article>
        <article className='space-y-2'>
          <h3 className='text-xl font-bold'>{t('thirdTitle')}</h3>
          <p className='text-lg font-medium'>{t('thirdContent')}</p>
        </article>
      </span>
      <Image
        src='/svg/satoshi_logo.svg'
        width={119}
        height={31}
        alt='Satoshi Logo'
        className='flex-1'
      />
    </section>
  );
};

export default AdvantagesSection;
