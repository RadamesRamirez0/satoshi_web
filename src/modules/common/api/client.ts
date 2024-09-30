import axios, { AxiosError } from 'axios';

import { apiUrl } from '@/modules/common/constants/env';
import {
  ApiEndpointDelete,
  ApiEndpointGet,
  ApiEndpointPost,
  ApiEndpointPut,
} from '@/modules/common/interfaces/apiEndpoint';
import { ApiErrorResponse, ApiResponse } from '@/modules/common/interfaces/apiResponse';
import { formatPathParams, formatQueryParams } from '@/modules/common/utils/path';

const client = axios.create({ baseURL: apiUrl });

export const get = async <T, Q, P>({
  url,
  queryParams,
  pathParams,
  config,
}: ApiEndpointGet<Q, P>): Promise<ApiResponse<T> | undefined> => {
  try {
    const queryParamsParsed = formatQueryParams(queryParams as Record<string, string>);

    const finalUrl = `${formatPathParams(url, pathParams as Record<string, string>)}${queryParamsParsed}`;

    const res = await client.get<ApiResponse<T>>(finalUrl);

    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      await config?.onError?.(e);

      return e.response?.data as ApiErrorResponse;
    }
  }
};

export const post = async <R, B, P>({
  url,
  body,
  pathParams,
  config,
}: ApiEndpointPost<R, B, P>): Promise<ApiResponse<R> | undefined> => {
  try {
    const finalUrl = formatPathParams(url, pathParams as Record<string, string>);

    const res = await client.post<ApiResponse<R>>(finalUrl, body);

    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      await config?.onError?.(e);

      return e.response?.data as ApiErrorResponse;
    }
  }
};

export const put = async <T, B, P>({
  url,
  body,
  pathParams,
  config,
}: ApiEndpointPut<B, P>): Promise<ApiResponse<T> | undefined> => {
  try {
    const finalUrl = formatPathParams(url, pathParams);

    const res = await client.put<ApiResponse<T>>(finalUrl, body);

    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      await config?.onError?.(e);

      return e.response?.data as ApiErrorResponse;
    }
  }
};

export const del = async <T, P>({
  url,
  pathParams,
  config,
}: ApiEndpointDelete<P>): Promise<ApiResponse<T> | undefined> => {
  try {
    const finalUrl = formatPathParams(url, pathParams);

    const res = await client.delete<ApiResponse<T>>(finalUrl);

    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      await config?.onError?.();
    }
  }
};
