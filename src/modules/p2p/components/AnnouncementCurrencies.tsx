import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { Label } from '@/modules/common/ui/components/label';
import { Currency } from '@/modules/cripto/models/currency';
import {
  getCryptoCurrencies,
  getFiatCurrencies,
} from '@/modules/cripto/utils/filterCurrencies';

export interface AnnouncementCurrenciesProps {
  base: Currency;
  quote: Currency;
  setBase: (base: Currency) => void;
  setQuote: (quote: Currency) => void;

  currencies: Currency[];
}

const AnnouncementCurrencies: FC<AnnouncementCurrenciesProps> = ({
  base,

  quote,

  setBase,
  setQuote,
  currencies,
}) => {
  const t = useTranslations('CreateAnnouncement');

  return (
    <span className='flex gap-12 items-center'>
      <div>
        <span className='flex flex-col'>
          <Label className='text-xl'>{t('base')}</Label>
          <Combobox
            align='start'
            id='base'
            onChange={setBase}
            value={base}
            triggerClassName='w-64'
            variant='outline'
            searcher
            dropdownAsTriggerWidth
            defaultLabel={base.symbol}
            size='input'
          >
            {getCryptoCurrencies(currencies).map((c) => (
              <ComboboxItem key={c.id} value={c} subLabel={c.name}>
                {c.symbol}
              </ComboboxItem>
            ))}
          </Combobox>
        </span>
        {!base.id && (
          <span className='flex gap-2 pt-2'>
            {getCryptoCurrencies(currencies).map((c) => (
              <Button
                key={c.id}
                variant='ghost'
                className='border'
                onClick={(e) => {
                  e.preventDefault();
                  setBase(c);
                }}
              >
                {c.symbol}
              </Button>
            ))}
          </span>
        )}
      </div>
      <ArrowRightIcon className='size-5 mb-4 text-primary' />
      <div>
        <span className='flex flex-col'>
          <Label className='text-xl'>{t('quote')}</Label>
          <Combobox
            align='start'
            id='quote'
            onChange={setQuote}
            value={quote}
            triggerClassName='w-64'
            variant='outline'
            searcher
            dropdownAsTriggerWidth
            defaultLabel={quote.symbol}
            size='input'
          >
            {getFiatCurrencies(currencies).map((c) => (
              <ComboboxItem key={c.id} value={c} subLabel={c.name}>
                {c.symbol}
              </ComboboxItem>
            ))}
          </Combobox>
        </span>
        {!quote.id && (
          <span className='flex gap-2 pt-2'>
            {getFiatCurrencies(currencies).map((c) => (
              <Button
                key={c.id}
                variant='ghost'
                className='border'
                onClick={(e) => {
                  e.preventDefault();
                  setQuote(c);
                }}
              >
                {c.symbol}
              </Button>
            ))}
          </span>
        )}
      </div>
    </span>
  );
};

export default AnnouncementCurrencies;
