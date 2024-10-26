import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import {
  CreateAnnouncementDTO,
  CreateAnnouncementResponse,
} from '@/modules/p2p/repository/dtos/createAnnouncementDto';

export const createAnnouncement: ApiEndpointPost<
  CreateAnnouncementResponse,
  CreateAnnouncementDTO
> = {
  url: '/v1/fiat-ramp/announcement',
  method: 'POST',
};
