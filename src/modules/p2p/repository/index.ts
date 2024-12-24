import { createRepository } from '@/modules/common/api/createRepository';
import { closeAnnouncement } from '@/modules/p2p/repository/closeAnnouncement';
import { createAnnouncement } from '@/modules/p2p/repository/createAnnouncement';
import { createBuyOrder } from '@/modules/p2p/repository/createBuyOrder';
import { getAnnouncement } from '@/modules/p2p/repository/getAnnouncement';
import { getAnnouncements } from '@/modules/p2p/repository/getAnnouncements';
import { getMessages } from '@/modules/p2p/repository/getMessages';
import { getOrder } from '@/modules/p2p/repository/getOrder';
import { markOrderAsPaid } from '@/modules/p2p/repository/markOrderAsPaid';
import { myAnnouncements } from '@/modules/p2p/repository/myAnnouncements';
import { pauseAnnouncement } from '@/modules/p2p/repository/pauseAnnouncement';
import { paymentMethods } from '@/modules/p2p/repository/paymentMethods';
import { releasePaidOrder } from '@/modules/p2p/repository/releasePaidOrder';
import { resumeAnnouncement } from '@/modules/p2p/repository/resumeAnnouncement';
import { sendMessage } from '@/modules/p2p/repository/sendMessage';
import { takeAnnouncement } from '@/modules/p2p/repository/takeAnnouncement';

const repository = {
  paymentMethods,
  createBuyOrder,
  markOrderAsPaid,
  releasePaidOrder,
  createAnnouncement,
  getOrder,
  getAnnouncements,
  myAnnouncements,
  getAnnouncement,
  getMessages,
  sendMessage,
  takeAnnouncement,
  closeAnnouncement,
  resumeAnnouncement,
  pauseAnnouncement,
};

export const p2pRepository = createRepository(repository);
