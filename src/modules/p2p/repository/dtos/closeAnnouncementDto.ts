import { ApiResponse } from '@/modules/common/interfaces/apiResponse';

export interface CloseAnnouncementDTO {
  announcement_id: string;
}

export type CloseAnnouncementResponse = ApiResponse<{ id: string; status: string }>;
