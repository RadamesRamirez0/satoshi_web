import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface ResumeAnnouncementDTO {
  announcement_id: string;
}

export type ResumeAnnouncementResponse = ApiResponse<{ id: string; status: string }>;
