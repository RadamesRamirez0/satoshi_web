'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardContent } from '@/modules/common/ui/components/card';
import { useExpressContext } from '@/modules/express/contexts/ExpressContext';

const HowToSection = () => {
  const t = useTranslations('HowTo');

  const { base, quote, orderType } = useExpressContext();

  return (
    <section className='relative py-20'>
      {/* Background elements */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div className='absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/10 via-primary/10 to-transparent rounded-full blur-3xl'></div>
        <div className='absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-purple-500/10 via-primary/10 to-transparent rounded-full blur-3xl'></div>
      </div>

      <div className='space-y-12'>
        <div className='text-center space-y-4'>
          <h2 className='text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent'>
            {t(`${orderType}MainTitle`, { base })}
          </h2>
          <div className='h-1 w-24 bg-gradient-to-r from-primary via-emerald-400 to-primary rounded-full mx-auto'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Step 1 */}
          <div className='group relative'>
            <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100'></div>
            <Card className='relative bg-gradient-to-br from-zinc-900/60 to-zinc-800/80 backdrop-blur-xl border border-zinc-700/40 hover:border-primary/30 transition-all duration-300 overflow-hidden'>
              <CardContent className='space-y-6 p-8'>
                <div className='relative'>
                  <div className='absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary/30 to-emerald-500/30 rounded-full flex items-center justify-center border border-primary/40'>
                    <span className='text-black font-bold'>1</span>
                  </div>
                  <div className='bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/30'>
                    <Image
                      src='/svg/buyStep1.svg'
                      alt='Compra rápida de criptomonedas con Satoshi Payments Express paso 1'
                      width={960}
                      height={540}
                      className='w-full opacity-90'
                    />
                  </div>
                </div>
                <div className='space-y-3'>
                  <h3 className='text-xl font-bold text-primary'>
                    {t(`${orderType}StepOneTitle`)}
                  </h3>
                  <p className='text-zinc-300 leading-relaxed'>
                    {t(`${orderType}StepOneContent`, { base, quote })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 2 */}
          <div className='group relative'>
            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100'></div>
            <Card className='relative bg-gradient-to-br from-zinc-900/60 to-zinc-800/80 backdrop-blur-xl border border-zinc-700/40 hover:border-blue-500/30 transition-all duration-300 overflow-hidden'>
              <CardContent className='space-y-6 p-8'>
                <div className='relative'>
                  <div className='absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-blue-500/40'>
                    <span className='text-white font-bold'>2</span>
                  </div>
                  <div className='bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/30'>
                    <Image
                      src='/svg/buyStep2.svg'
                      alt='Compra rápida de criptomonedas con Satoshi Payments Express paso 2'
                      width={960}
                      height={540}
                      className='w-full opacity-90'
                    />
                  </div>
                </div>
                <div className='space-y-3'>
                  <h3 className='text-xl font-bold text-blue-300'>
                    {t(`${orderType}StepTwoTitle`, { quote, base })}
                  </h3>
                  <p className='text-zinc-300 leading-relaxed'>
                    {t(`${orderType}StepTwoContent`, { quote })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 3 */}
          <div className='group relative'>
            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100'></div>
            <Card className='relative bg-gradient-to-br from-zinc-900/60 to-zinc-800/80 backdrop-blur-xl border border-zinc-700/40 hover:border-purple-500/30 transition-all duration-300 overflow-hidden'>
              <CardContent className='space-y-6 p-8'>
                <div className='relative'>
                  <div className='absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center border border-purple-500/40'>
                    <span className='text-white font-bold'>3</span>
                  </div>
                  <div className='bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/30'>
                    <Image
                      src='/svg/buyStep3.svg'
                      alt='Compra rápida de criptomonedas con Satoshi Payments Express paso 3'
                      width={960}
                      height={540}
                      className='w-full opacity-90'
                    />
                  </div>
                </div>
                <div className='space-y-3'>
                  <h3 className='text-xl font-bold text-purple-300'>
                    {t(`${orderType}StepThreeTitle`, { base })}
                  </h3>
                  <p className='text-zinc-300 leading-relaxed'>
                    {t(`${orderType}StepThreeContent`, { base, quote })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
