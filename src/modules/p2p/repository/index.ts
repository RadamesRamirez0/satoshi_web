import { createRepository } from '@/modules/common/api/createRepository';
import { createAnnouncement } from '@/modules/p2p/repository/createAnnouncement';
import { createBuyOrder } from '@/modules/p2p/repository/createBuyOrder';
import { markOrderAsPaid } from '@/modules/p2p/repository/markOrderAsPaid';
import { paymentMethods } from '@/modules/p2p/repository/paymentMethods';
import { releasePaidOrder } from '@/modules/p2p/repository/releasePaidOrder';

const repository = {
  paymentMethods,
  createBuyOrder,
  markOrderAsPaid,
  releasePaidOrder,
  createAnnouncement,
};

export const p2pRepository = createRepository(repository);
