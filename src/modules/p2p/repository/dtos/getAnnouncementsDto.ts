import { ApiPaginatedResponse } from '@/modules/common/interfaces/apiPaginatedResponse';
import { Announcement } from '@/modules/p2p/models/announcement';

export interface GetAnnouncementsDTO {
  user_id?: string;
  type?: string;
  base?: string;
  quote?: string;
  status?: string;
  minimum_order_size?: string;
  maximum_order_size?: string;
  payment_method?: string;
  sort_by?: 'price' | 'minimum_order_size' | 'maximum_order_size';
  order?: 'asc' | 'desc';
  page?: number;
  page_size?: number;
}

export type GetAnnouncementsResponse = ApiPaginatedResponse<Announcement>;
