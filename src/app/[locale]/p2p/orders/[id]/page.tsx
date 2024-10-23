import React from 'react';

import { withAuth } from '@/modules/auth/utils/withAuth';
import OrderView from '@/modules/p2p/views/OrderView';

const OrderPage = ({ params }: { params: { id: string } }) => {
  return <OrderView id={params.id} />;
};

export default withAuth(OrderPage);
