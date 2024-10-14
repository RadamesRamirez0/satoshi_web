import { OrderType } from '@/modules/express/models/orderType';
import PaymentsOrdersView from '@/modules/express/views/PaymentOrdersView';

const PaymentsPage = ({ params }: { params: { slug: string[] } }) => {
  if (params.slug.length < 5) {
    return null;
  }

  return (
    <PaymentsOrdersView
      baseCurrency={params.slug[0]}
      quoteCurrency={params.slug[1]}
      amountCurrencyType={params.slug[2] as 'base' | 'quote'}
      amountCurrency={params.slug[3]}
      orderType={params.slug[4] as OrderType}
    />
  );
};

export default PaymentsPage;
