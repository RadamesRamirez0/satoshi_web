import { withAuth } from '@/modules/auth/utils/withAuth';
import MyAnnouncementsView from '@/modules/p2p/views/MyAnnouncementsView';

export default withAuth(MyAnnouncementsView);
