import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import {
  GetAnnouncementDTO,
  GetAnnouncementResponse,
} from '@/modules/p2p/repository/dtos/getAnnouncementDto';

export const getAnnouncement: ApiEndpointGet<
  GetAnnouncementResponse,
  undefined,
  GetAnnouncementDTO
> = {
  url: '/v1/fiat-ramp/announcement/{announcement_id}',
  method: 'GET',
};
