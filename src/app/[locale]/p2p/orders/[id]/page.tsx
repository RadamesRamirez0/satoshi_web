import React from 'react';

import OrderView from '@/modules/p2p/views/OrderView';

const OrderPage = ({ params }: { params: { id: string } }) => {
  return <OrderView id={params.id} />;
};

export default OrderPage;
