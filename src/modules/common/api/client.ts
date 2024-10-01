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
}: ApiEndpointGet<Q, P>): Promise<R | undefined> => {
  try {
    const queryParamsParsed = formatQueryParams(queryParams as Record<string, string>);
    const finalUrl = `${formatPathParams(url, pathParams as Record<string, string>)}${queryParamsParsed}`;

    const res = await fetch(`${apiUrl}${finalUrl}`, {
      method: 'GET',
    });

    return res.json() as R;
  } catch (e) {
    console.log(e);
  }
};

export const post = async <R, B, P>({
  url,
  body,
  pathParams,
  contentType = 'json',
}: ApiEndpointPost<R, B, P>): Promise<R | undefined> => {
  try {
    const finalUrl = formatPathParams(url, pathParams as Record<string, string>);

    const res = await fetch(`${apiUrl}${finalUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type':
          contentType === 'json'
            ? 'application/json'
            : 'application/x-www-form-urlencoded',
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
}: ApiEndpointPut<B, P>): Promise<R | undefined> => {
  try {
    const finalUrl = formatPathParams(url, pathParams as Record<string, string>);

    const res = await fetch(`${apiUrl}${finalUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type':
          contentType === 'json'
            ? 'application/json'
            : 'application/x-www-form-urlencoded',
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
}: ApiEndpointDelete<P>): Promise<R | undefined> => {
  try {
    const finalUrl = formatPathParams(url, pathParams as Record<string, string>);

    const res = await fetch(`${apiUrl}${finalUrl}`, {
      method: 'DELETE',
    });

    return (await res.json()) as R;
  } catch (e) {
    console.log(e);
  }
};
