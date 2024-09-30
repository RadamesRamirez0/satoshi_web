import { AxiosError, AxiosRequestConfig } from 'axios';

interface ServiceConfig extends AxiosRequestConfig<unknown> {
  onError?: (e: AxiosError) => Promise<void> | void;
}

export type DTORecord = Record<string, string | null> | undefined;

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  config?: ServiceConfig;
}
export interface ApiEndpointGet<R, Q = DTORecord, P = DTORecord> extends ApiEndpoint {
  method: 'GET';
  queryParams?: Q;
  pathParams?: P;
  response?: R;
}
export interface ApiEndpointPost<R, B, P = DTORecord> extends ApiEndpoint {
  method: 'POST';
  body: B;
  pathParams?: P;
  response?: R;
}
export interface ApiEndpointPut<R, B, P = DTORecord> extends ApiEndpoint {
  method: 'PUT';
  body?: B;
  pathParams?: P;
  response?: R;
}
export interface ApiEndpointDelete<R, P = DTORecord> extends ApiEndpoint {
  method: 'DELETE';
  pathParams?: P;
  response?: R;
}
