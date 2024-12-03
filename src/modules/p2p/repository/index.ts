import { createRepository } from '@/modules/common/api/createRepository';
import { createAnnouncement } from '@/modules/p2p/repository/createAnnouncement';
import { createBuyOrder } from '@/modules/p2p/repository/createBuyOrder';
import { getAnnouncements } from '@/modules/p2p/repository/getAnnouncements';
import { getMessages } from '@/modules/p2p/repository/getMessages';
import { getOrder } from '@/modules/p2p/repository/getOrder';
import { markOrderAsPaid } from '@/modules/p2p/repository/markOrderAsPaid';
import { paymentMethods } from '@/modules/p2p/repository/paymentMethods';
import { releasePaidOrder } from '@/modules/p2p/repository/releasePaidOrder';
import { sendMessage } from '@/modules/p2p/repository/sendMessage';

const repository = {
  paymentMethods,
  createBuyOrder,
  markOrderAsPaid,
  releasePaidOrder,
  createAnnouncement,
  getOrder,
  getAnnouncements,
  getMessages,
  sendMessage,
};

export const p2pRepository = createRepository(repository);
