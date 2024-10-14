'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { Button } from '@/modules/common/ui/components/button';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { Input } from '@/modules/common/ui/components/input';
import { Label } from '@/modules/common/ui/components/label';
import { Currency } from '@/modules/cripto/models/currency';
import { criptoRepository } from '@/modules/cripto/repository';
import { getCryptoCurrencies } from '@/modules/cripto/utils/filterCurrencies';

const WithdrawForm = () => {
  const [currency, setCurrency] = useState<Currency>();
  const [network, setNetwork] = useState<string>();
  const [depositAddress, setDepositAddress] = useState<string>();
  const [amount, setAmount] = useState<string>('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const t = useTranslations('Withdraw');

  useEffect(() => {
    void criptoRepository.getCurrencies({}).then((data) => {
      setCurrencies(getCryptoCurrencies(data));
    });
  }, []);

  return (
    <section className='flex flex-col  gap-3 w-[40rem]'>
      <span className=''>
        <Label className='text-xl'>{t('selectCurrency')}</Label>
        <Combobox
          align='start'
          id='currency'
          onChange={setCurrency}
          value={currency}
          triggerClassName='w-full'
          variant='outline'
          searcher
          dropdownAsTriggerWidth
          defaultLabel={currency?.symbol}
          size='input'
        >
          {currencies.map((c) => (
            <ComboboxItem key={c.id} value={c} subLabel={c.name}>
              {c.symbol}
            </ComboboxItem>
          ))}
        </Combobox>
      </span>
      {!currency && (
        <span className='flex gap-2 pt-2'>
          {currencies.map((c) => (
            <Button
              key={c.id}
              variant='ghost'
              className='border'
              onClick={(e) => {
                e.preventDefault();
                setCurrency(c);
              }}
            >
              {c.symbol}
            </Button>
          ))}
        </span>
      )}
      <span>
        <Label className='text-xl'>{t('network')}</Label>
        <Input
          id='network'
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
        />
      </span>
      <span>
        <Label className='text-xl'>{t('address')}</Label>
        <Input
          id='address'
          value={depositAddress}
          onChange={(e) => setDepositAddress(e.target.value)}
        />
      </span>
      <span>
        <Label className='text-xl'>{t('amount')}</Label>
        <Input
          id='amount'
          numeric
          state={amount}
          setState={setAmount}
          decimals={currency?.precision ?? 8}
        />
      </span>
    </section>
  );
};

export default WithdrawForm;
