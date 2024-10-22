import { withAuth } from '@/modules/auth/utils/withAuth';
import CreateAnnouncementView from '@/modules/p2p/views/CreateAnnouncementView';

const CreateAnnouncementPage = () => {
  return <CreateAnnouncementView />;
};

export default withAuth(CreateAnnouncementPage);
