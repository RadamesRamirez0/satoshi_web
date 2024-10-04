'use client';

import React, { FC, PropsWithChildren } from 'react';

import { ExpressProvider } from '@/modules/express/contexts/ExpressContext';

const ClientWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <ExpressProvider>{children}</ExpressProvider>;
};

export default ClientWrapper;
