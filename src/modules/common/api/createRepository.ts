import { del, get, patch, post, put } from '@/modules/common/api/client';
import {
  ApiEndpointDelete,
  ApiEndpointGet,
  ApiEndpointPatch,
  ApiEndpointPost,
  ApiEndpointPut,
} from '@/modules/common/interfaces/apiEndpoint';

type Endpoint =
  | ApiEndpointGet<unknown, unknown, unknown>
  | ApiEndpointPost<unknown, unknown, unknown, unknown>
  | ApiEndpointPut<unknown, unknown, unknown>
  | ApiEndpointDelete<unknown, unknown>
  | ApiEndpointPatch<unknown, unknown, unknown>;

type Repository<T extends Record<string, Endpoint>> = {
  [K in keyof T]: T[K] extends ApiEndpointGet<infer R, infer Q, infer P>
    ? (params: {
        queryParams?: Q;
        pathParams?: P;
        token?: string;
        headers?: Parameters<typeof get>[0]['headers'];
      }) => Promise<R>
    : T[K] extends ApiEndpointPost<infer R, infer B, infer P, infer Q>
      ? (params: {
          body: B;
          pathParams?: P;
          queryParams?: Q;
          token?: string;
          headers?: Parameters<typeof post>[0]['headers'];
        }) => Promise<R>
      : T[K] extends ApiEndpointPut<infer R, infer B, infer P>
        ? (params: {
            body: B;
            pathParams?: P;
            token?: string;
            headers?: Parameters<typeof put>[0]['headers'];
          }) => Promise<R>
        : T[K] extends ApiEndpointDelete<infer R, infer P>
          ? (params: {
              pathParams?: P;
              headers?: Parameters<typeof del>[0]['headers'];
            }) => Promise<R>
          : T[K] extends ApiEndpointPatch<infer R, infer B, infer P>
            ? (params: {
                body: B;
                pathParams?: P;
                token?: string;
                headers?: Parameters<typeof put>[0]['headers'];
              }) => Promise<R>
            : never;
};

export const createRepository = <T extends Record<string, Endpoint>>(
  endpoints: T,
  baseUrl?: string,
): Repository<T> => {
  return Object.entries(endpoints).reduce((acc, [key, value]) => {
    if (value.method === 'GET') {
      //@ts-expect-error No pasada nada home
      acc[key] = async ({
        queryParams,
        pathParams,
        headers,
        token,
      }: {
        queryParams?: Parameters<typeof get>[0]['queryParams'];
        pathParams?: Parameters<typeof get>[0]['pathParams'];
        headers?: Parameters<typeof get>[0]['headers'];
        token?: string;
      }) => {
        return await get({
          ...value,
          queryParams,
          pathParams,
          baseUrl,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
          },
        });
      };
    }

    if (value.method === 'POST') {
      //@ts-expect-error No pasada nada home
      acc[key] = async ({
        body,
        pathParams,
        queryParams,
        headers,
        token,
      }: {
        body: Parameters<typeof post>[0]['body'];
        pathParams?: Parameters<typeof post>[0]['pathParams'];
        queryParams?: Parameters<typeof post>[0]['queryParams'];
        headers?: Parameters<typeof post>[0]['headers'];
        token?: string;
      }) =>
        post({
          ...value,
          body,
          pathParams,
          queryParams,
          baseUrl,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
          },
        });
    }

    if (value.method === 'PUT') {
      //@ts-expect-error No pasada nada home
      acc[key] = async ({
        body,
        pathParams,
        headers,
        token,
      }: {
        body: Parameters<typeof put>[0]['body'];
        pathParams?: Parameters<typeof put>[0]['pathParams'];
        headers?: Parameters<typeof put>[0]['headers'];
        token?: string;
      }) =>
        put({
          ...value,
          body,
          pathParams,
          baseUrl,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
          },
        });
    }
    if (value.method === 'PATCH') {
      //@ts-expect-error No pasada nada home
      acc[key] = async ({
        body,
        pathParams,
        headers,
        token,
      }: {
        body: Parameters<typeof patch>[0]['body'];
        pathParams?: Parameters<typeof patch>[0]['pathParams'];
        headers?: Parameters<typeof patch>[0]['headers'];
        token?: string;
      }) =>
        patch({
          ...value,
          body,
          pathParams,
          baseUrl,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
          },
        });
    }
    if (value.method === 'DELETE') {
      //@ts-expect-error No pasada nada home
      acc[key] = async ({
        pathParams,
        headers,
        token,
      }: {
        pathParams?: Parameters<typeof del>[0]['pathParams'];
        headers?: Parameters<typeof del>[0]['headers'];
        token?: string;
      }) =>
        del({
          ...value,
          pathParams,
          baseUrl,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
          },
        });
    }

    return acc;
  }, {} as Repository<T>);
};
