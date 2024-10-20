export type DTORecord = Record<string, string | null> | undefined;

export interface ApiEndpoint {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  contentType?: 'json' | 'x-www-form-urlencoded';
}
export interface ApiEndpointGet<R, Q = DTORecord, P = DTORecord> extends ApiEndpoint {
  method?: 'GET';
  queryParams?: Q;
  pathParams?: P;
  response?: R;
  headers?: Record<string, string>;
  token?: string;
}
export interface ApiEndpointPost<R, B, P = DTORecord, Q = DTORecord> extends ApiEndpoint {
  method?: 'POST';
  body?: B;
  pathParams?: P;
  queryParams?: Q;
  response?: R;
  headers?: Record<string, string>;
}
export interface ApiEndpointPut<R, B, P = DTORecord> extends ApiEndpoint {
  method?: 'PUT';
  body?: B;
  pathParams?: P;
  response?: R;
  headers?: Record<string, string>;
}

export interface ApiEndpointPatch<R, B, P = DTORecord> extends ApiEndpoint {
  method?: 'PATCH';
  body?: B;
  pathParams?: P;
  response?: R;
  headers?: Record<string, string>;
}
export interface ApiEndpointDelete<R, P = DTORecord> extends ApiEndpoint {
  method?: 'DELETE';
  pathParams?: P;
  response?: R;
  headers?: Record<string, string>;
}
