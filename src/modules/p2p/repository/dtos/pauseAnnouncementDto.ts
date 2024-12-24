import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface PauseAnnouncementDTO {
  announcement_id: string;
}

export type PauseAnnouncementResponse = ApiResponse<{ id: string; status: string }>;
