import { ApiEndpointPut } from '@/modules/common/interfaces/apiEndpoint';
import {
  ResumeAnnouncementDTO,
  ResumeAnnouncementResponse,
} from '@/modules/p2p/repository/dtos/resumeAnnouncementDto';

export const resumeAnnouncement: ApiEndpointPut<
  ResumeAnnouncementResponse,
  undefined,
  ResumeAnnouncementDTO
> = {
  url: '/v1/fiat-ramp/announcement/{announcement_id}/resume',
  method: 'PUT',
};
