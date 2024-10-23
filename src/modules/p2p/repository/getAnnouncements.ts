import { ApiEndpointGet } from '@/modules/common/interfaces/apiEndpoint';
import {
  GetAnnouncementsDTO,
  GetAnnouncementsResponse,
} from '@/modules/p2p/repository/dtos/getAnnouncementsDto';

export const getAnnouncements: ApiEndpointGet<
  GetAnnouncementsResponse,
  GetAnnouncementsDTO
> = {
  url: '/v1/fiat-ramp/announcement/list',
  method: 'GET',
};
