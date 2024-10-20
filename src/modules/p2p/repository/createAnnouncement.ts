import { ApiEndpointPost } from '@/modules/common/interfaces/apiEndpoint';
import { CreateAnnouncementDTO } from '@/modules/p2p/repository/dtos/createAnnouncementDto';

export const createAnnouncement: ApiEndpointPost<unknown, CreateAnnouncementDTO> = {
  url: '/v1/fiat-ramp/announcement',
  method: 'POST',
};
