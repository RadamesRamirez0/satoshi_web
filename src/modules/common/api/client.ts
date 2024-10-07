import { apiUrl } from '@/modules/common/constants/env';
import {
  ApiEndpointDelete,
  ApiEndpointGet,
  ApiEndpointPost,
  ApiEndpointPut,
} from '@/modules/common/interfaces/apiEndpoint';
import { formatPathParams, formatQueryParams } from '@/modules/common/utils/path';

export const get = async <R, Q, P>({
  url,
  queryParams,
  pathParams,
  baseUrl,
  headers,
}: ApiEndpointGet<Q, P> & { baseUrl?: string }): Promise<R | undefined> => {
  try {
    const queryParamsParsed = formatQueryParams(queryParams as Record<string, string>);
    const finalUrl = `${formatPathParams(url, pathParams as Record<string, string>)}${queryParamsParsed}`;

    const res = await fetch(`${baseUrl ?? apiUrl}${finalUrl}`, {
      method: 'GET',
      headers,
    });

    return res.json() as R;
  } catch (e) {
    console.log(e);
  }
};

export const post = async <R, B, P, Q>({
  url,
  body,
  pathParams,
  queryParams,
  contentType = 'json',
  baseUrl,
  headers,
}: ApiEndpointPost<R, B, P, Q> & { baseUrl?: string }): Promise<R | undefined> => {
  try {
    const queryParamsParsed = formatQueryParams(queryParams as Record<string, string>);
    const finalUrl = `${formatPathParams(url, pathParams as Record<string, string>)}${queryParamsParsed}`;

    const res = await fetch(`${baseUrl ?? apiUrl}${finalUrl}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':
          contentType === 'json'
            ? 'application/json'
            : 'application/x-www-form-urlencoded',
        ...headers,
      },
      body:
        contentType === 'json'
          ? JSON.stringify(body)
          : new URLSearchParams(body as Record<string, string>),
    });

    return (await res.json()) as R;
  } catch (e) {
    console.log(e);
  }
};

export const put = async <R, B, P>({
  url,
  body,
  pathParams,
  contentType = 'json',
  baseUrl,
  headers,
}: ApiEndpointPut<B, P> & { baseUrl?: string }): Promise<R | undefined> => {
  try {
    const finalUrl = formatPathParams(url, pathParams as Record<string, string>);

    const res = await fetch(`${baseUrl ?? apiUrl}${finalUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type':
          contentType === 'json'
            ? 'application/json'
            : 'application/x-www-form-urlencoded',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return (await res.json()) as R;
  } catch (e) {
    console.log(e);
  }
};

export const del = async <R, P>({
  url,
  pathParams,
  baseUrl,
  headers,
}: ApiEndpointDelete<P> & { baseUrl?: string }): Promise<R | undefined> => {
  try {
    const finalUrl = formatPathParams(url, pathParams as Record<string, string>);

    const res = await fetch(`${baseUrl ?? apiUrl}${finalUrl}`, {
      method: 'DELETE',
      headers,
    });

    return (await res.json()) as R;
  } catch (e) {
    console.log(e);
  }
};
