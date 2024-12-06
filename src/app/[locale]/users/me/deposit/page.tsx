import { withAuth } from '@/modules/auth/utils/withAuth';
import DepositView from '@/modules/users/views/DepositView';

export default withAuth(DepositView);
