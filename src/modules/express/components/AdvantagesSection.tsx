import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const AdvantagesSection = async () => {
  const t = await getTranslations('Advantages');

  return (
    <section className='relative pt-32 pb-16'>
      {/* Background decoration */}
      <div className='absolute inset-0 -z-10 opacity-30'>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/10 via-emerald-500/5 to-transparent rounded-full blur-3xl'></div>
      </div>

      <div className='flex gap-12 flex-col lg:flex-row items-center'>
        <div className='flex-1 space-y-10'>
          <div className='space-y-4'>
            <h2 className='text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent leading-tight'>
              {t('mainTitle')}
            </h2>
            <div className='h-1 w-20 bg-gradient-to-r from-primary via-emerald-400 to-primary rounded-full'></div>
          </div>

          <div className='grid gap-8'>
            <article className='group'>
              <div className='bg-gradient-to-r from-zinc-900/40 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-6 hover:border-primary/20 transition-all duration-300'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-xl flex items-center justify-center border border-primary/30'>
                    <div className='w-6 h-6 bg-primary rounded-full'></div>
                  </div>
                  <div className='space-y-2 flex-1'>
                    <h3 className='text-xl font-bold text-primary'>{t('firstTitle')}</h3>
                    <p className='text-lg font-medium text-zinc-300 leading-relaxed'>
                      {t('firstContent')}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className='group'>
              <div className='bg-gradient-to-r from-zinc-900/40 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-300'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30'>
                    <div className='w-6 h-6 bg-blue-500 rounded-full'></div>
                  </div>
                  <div className='space-y-2 flex-1'>
                    <h3 className='text-xl font-bold text-blue-300'>
                      {t('secondTitle')}
                    </h3>
                    <p className='text-lg font-medium text-zinc-300 leading-relaxed'>
                      {t('secondContent')}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className='group'>
              <div className='bg-gradient-to-r from-zinc-900/40 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-6 hover:border-purple-500/20 transition-all duration-300'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30'>
                    <div className='w-6 h-6 bg-purple-500 rounded-full'></div>
                  </div>
                  <div className='space-y-2 flex-1'>
                    <h3 className='text-xl font-bold text-purple-300'>
                      {t('thirdTitle')}
                    </h3>
                    <p className='text-lg font-medium text-zinc-300 leading-relaxed'>
                      {t('thirdContent')}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className='flex-1 flex justify-center lg:justify-end'>
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-emerald-400/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500'></div>
            <div className='relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-12 shadow-2xl'>
              <Image
                src='/svg/satoshi_logo.svg'
                width={200}
                height={52}
                alt='Satoshi Logo'
                className='filter brightness-110'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
