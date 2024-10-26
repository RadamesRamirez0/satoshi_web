import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import HintText from '@/modules/common/ui/components/hintText';
import { Label } from '@/modules/common/ui/components/label';
import { cn } from '@/modules/common/ui/lib/utils';
import {
  getCryptoCurrencies,
  getFiatCurrencies,
} from '@/modules/cripto/utils/filterCurrencies';
import { useCreateAnnouncementContext } from '@/modules/p2p/contexts/CreateAnnouncementContext';

const AnnouncementCurrencies: FC = () => {
  const t = useTranslations('CreateAnnouncement');
  const { formik, currencies } = useCreateAnnouncementContext();

  const { base, quote } = formik.values;

  return (
    <span className='flex flex-col md:flex-row  md:gap-12 items-start'>
      <div>
        <span className='flex flex-col'>
          <Label className='text-xl' htmlFor='base'>
            {t('base')}
          </Label>
          <Combobox
            align='start'
            id='base'
            onBlur={formik.handleBlur}
            onChange={(v) => void formik.setFieldValue('base', v)}
            value={base}
            triggerClassName='w-64'
            variant='outline'
            searcher
            dropdownAsTriggerWidth
            label={base?.symbol}
            size='input'
          >
            {getCryptoCurrencies(currencies).map((c) => (
              <ComboboxItem key={c.id} value={c} subLabel={c.name}>
                {c.symbol}
              </ComboboxItem>
            ))}
          </Combobox>
        </span>
        {!base?.id && (
          <span className='flex gap-2 pt-2'>
            {getCryptoCurrencies(currencies).map((c) => (
              <Button
                key={c.id}
                variant='ghost'
                className='border'
                onClick={(e) => {
                  e.preventDefault();
                  void formik.setFieldValue('base', c);
                }}
              >
                {c.symbol}
              </Button>
            ))}
          </span>
        )}
        <HintText
          variant='error'
          className={cn('opacity-0', formik.touched.base && !base?.id && 'opacity-100')}
        >
          {formik.errors.base ?? '.'}
        </HintText>
      </div>
      <ArrowRightIcon className='size-5   md:mt-10 text-primary hidden md:flex' />
      <div>
        <span className='flex flex-col'>
          <Label className='text-xl' htmlFor='quote'>
            {t('quote')}
          </Label>
          <Combobox
            onBlur={formik.handleBlur}
            align='start'
            id='quote'
            onChange={(v) => void formik.setFieldValue('quote', v)}
            value={quote}
            triggerClassName='w-64'
            variant='outline'
            searcher
            dropdownAsTriggerWidth
            label={quote?.symbol}
            size='input'
          >
            {getFiatCurrencies(currencies).map((c) => (
              <ComboboxItem key={c.id} value={c} subLabel={c.name}>
                {c.symbol}
              </ComboboxItem>
            ))}
          </Combobox>
        </span>
        {!quote?.id && (
          <span className='flex gap-2 pt-2'>
            {getFiatCurrencies(currencies).map((c) => (
              <Button
                key={c.id}
                variant='ghost'
                className='border'
                onClick={(e) => {
                  e.preventDefault();
                  void formik.setFieldValue('quote', c);
                }}
              >
                {c.symbol}
              </Button>
            ))}
          </span>
        )}
        <HintText
          variant='error'
          className={cn('opacity-0', formik.touched.quote && !quote?.id && 'opacity-100')}
        >
          {formik.errors.quote ?? '.'}
        </HintText>
      </div>
    </span>
  );
};

export default AnnouncementCurrencies;
