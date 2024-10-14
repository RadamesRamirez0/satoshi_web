import React, { FC } from 'react';

export interface OrderViewProps {
  id: string;
}

const OrderView: FC<OrderViewProps> = ({ id }) => {
  return <div>OrderView</div>;
};

export default OrderView;
