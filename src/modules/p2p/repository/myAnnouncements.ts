import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import {
  GetAnnouncementsDTO,
  GetAnnouncementsResponse,
} from '@/modules/p2p/repository/dtos/getAnnouncementsDto';

export const myAnnouncements: ApiEndpointGet<
  GetAnnouncementsResponse,
  GetAnnouncementsDTO
> = {
  url: '/v1/fiat-ramp/announcement/my_announcements',
  method: 'GET',
};
