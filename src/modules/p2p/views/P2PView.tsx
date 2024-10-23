import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/modules/common/ui/components/button';
import AdvantagesSection from '@/modules/express/components/AdvantagesSection';
import { P2PTable } from '@/modules/p2p/components/P2PTable';
import { PaymentMethod } from '@/modules/p2p/models/paymentMethod';

export interface Order {
  advertiser: string;
  price: string;
  available: string;
  payment: string;
}

export const announcements = [
  {
    id: '1',
    username: 'John Doe',
    orders: '10',
    completion: '100%',
    commendRate: '100%',
    transactionTime: 10,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '2',
    username: 'Jane Doe',
    orders: '5',
    completion: '96.5%',
    commendRate: '98%',
    transactionTime: 5,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '3',
    username: 'John Doe',
    orders: '10',
    completion: '100%',
    commendRate: '100%',
    transactionTime: 10,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '4',
    username: 'Jane Doe',
    orders: '5',
    completion: '96.5%',
    commendRate: '98%',
    transactionTime: 5,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '5',
    username: 'John Doe',
    orders: '10',
    completion: '100%',
    commendRate: '100%',
    transactionTime: 10,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '6',
    username: 'Jane Doe',
    orders: '5',
    completion: '96.5%',
    commendRate: '98%',
    transactionTime: 5,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '7',
    username: 'John Doe',
    orders: '10',
    completion: '100%',
    commendRate: '100%',
    transactionTime: 10,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '8',
    username: 'Jane Doe',
    orders: '5',
    completion: '96.5%',
    commendRate: '98%',
    transactionTime: 5,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '9',
    username: 'John Doe',
    orders: '10',
    completion: '100%',
    commendRate: '100%',
    transactionTime: 10,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '10',
    username: 'Jane Doe',
    orders: '5',
    completion: '96.5%',
    commendRate: '98%',
    transactionTime: 5,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '11',
    username: 'John Doe',
    orders: '10',
    completion: '100%',
    commendRate: '100%',
    transactionTime: 10,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
  {
    id: '12',
    username: 'Jane Doe',
    orders: '5',
    completion: '96.5%',
    commendRate: '98%',
    transactionTime: 5,
    price: '19.37',
    available: '38076.94',
    minOrder: '100.00',
    maxOrder: '1000.00',
    payments: [
      {
        id: '1',
        name: 'Bank Transfer',
        description: 'Bank Transfer',
        enable: true,
        required_data: {},
      },
    ] as PaymentMethod[],
  },
];

const P2PView = () => {
  const t = useTranslations('P2PView');

  return (
    <div>
      <div className='flex justify-end w-full '>
        <Button>{t('newAnnouncement')}</Button>
      </div>
      <P2PTable {...{ announcements }} />
      <AdvantagesSection />
    </div>
  );
};

export default P2PView;
