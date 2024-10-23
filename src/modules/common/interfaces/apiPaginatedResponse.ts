export interface ApiPaginatedResponse<T> {
  total_records: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  data: T[];
}
