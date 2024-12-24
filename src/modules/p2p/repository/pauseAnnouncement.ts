import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  PauseAnnouncementDTO,
  PauseAnnouncementResponse,
} from '@/modules/p2p/repository/dtos/pauseAnnouncementDto';

export const pauseAnnouncement: ApiEndpointPut<
  PauseAnnouncementResponse,
  undefined,
  PauseAnnouncementDTO
> = {
  url: '/v1/fiat-ramp/announcement/{announcement_id}/pause',
  method: 'PUT',
};
