import { withAuth } from '@/modules/auth/utils/withAuth';
import WithdrawView from '@/modules/users/views/WithdrawView';

export default withAuth(WithdrawView);
