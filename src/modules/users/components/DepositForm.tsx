'use client';

import { ClipboardIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { useSession } from '@/modules/auth/hooks/useSession';
import { Button } from '@/modules/common/ui/components/button';
import { Combobox } from '@/modules/common/ui/components/combobox';
import { ComboboxItem } from '@/modules/common/ui/components/comboboxItem';
import { Input } from '@/modules/common/ui/components/input';
import { Label } from '@/modules/common/ui/components/label';
import { Currency } from '@/modules/cripto/models/currency';
import { DepositAddress } from '@/modules/cripto/models/depositAddress';
import { criptoRepository } from '@/modules/cripto/repository';
import { generateQR } from '@/modules/cripto/services/generateQR';
import { getCryptoCurrencies } from '@/modules/cripto/utils/filterCurrencies';
import { generateAddressQR } from '@/modules/cripto/utils/generateAddresStringQR';

const DepositForm = () => {
  const [currency, setCurrency] = useState<Currency>();
  const [depositAddress, setDepositAddress] = useState<DepositAddress>();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const t = useTranslations('Deposit');
  const session = useSession();

  useEffect(() => {
    void criptoRepository.getCurrencies({}).then((data) => {
      setCurrencies(getCryptoCurrencies(data));
    });
  }, []);

  useEffect(() => {
    if (!currency?.id || !session.token) {
      return;
    }

    void criptoRepository
      .getDepositAddress({
        queryParams: { currency: currency.id },
        token: session.token,
      })
      .then((d) => {
        setDepositAddress(d);
      });
  }, [currency]);

  useEffect(() => {
    if (!depositAddress || !canvasRef.current || !currency) {
      return;
    }

    const qrString = generateAddressQR({
      address: depositAddress.address,
      currency: currency.name,
    });

    void generateQR(qrString, canvasRef.current);
  }, [depositAddress]);

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
          label={currency?.symbol}
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
          value={depositAddress?.network ?? ''}
          readOnly
          disabled={!currency}
        />
      </span>
      {depositAddress && (
        <div className='flex gap-8 items-end  py-4'>
          <div>
            <canvas id='QR' ref={canvasRef} className='rounded-xl'></canvas>
          </div>
          <span className='flex flex-col py-6'>
            <span className=' flex items-center gap-2'>
              <p className='text-3xl font-bold'>{t('address')}</p>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => {
                  void navigator.clipboard.writeText(depositAddress.address);
                }}
              >
                <ClipboardIcon className='h-5 w-5' />
              </Button>
            </span>
            <p className='font-mono'>{depositAddress.address}</p>
          </span>
        </div>
      )}
    </section>
  );
};

export default DepositForm;
