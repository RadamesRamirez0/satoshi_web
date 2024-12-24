import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  CloseAnnouncementDTO,
  CloseAnnouncementResponse,
} from '@/modules/p2p/repository/dtos/closeAnnouncementDto';

export const closeAnnouncement: ApiEndpointPut<
  CloseAnnouncementResponse,
  null | undefined,
  CloseAnnouncementDTO
> = {
  url: '/v1/fiat-ramp/announcement/{announcement_id}/close',
  method: 'PUT',
};
