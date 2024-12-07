import { ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { Announcement } from '@/modules/p2p/models/announcement';

export interface GetAnnouncementDTO {
  announcement_id: string;
}

export type GetAnnouncementResponse = ApiResponse<null> | Announcement;
