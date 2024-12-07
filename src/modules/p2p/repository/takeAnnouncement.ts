import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  TakeAnnouncementDTO,
  TakeAnnouncementResponse,
} from '@/modules/p2p/repository/dtos/takeAnnouncementDto';

export const takeAnnouncement: ApiEndpointPost<
  TakeAnnouncementResponse,
  TakeAnnouncementDTO
> = {
  url: '/v1/fiat-ramp/take_order',
  method: 'POST',
};
