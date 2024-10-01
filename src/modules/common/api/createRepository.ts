import { del, get, post, put } from '@/modules/common/api/client';
import {
  ApiEndpointDelete,
  ApiEndpointGet,
  ApiEndpointPost,
  ApiEndpointPut,
} from '@/modules/common/interfaces/apiEndpoint';

type Endpoint =
  | ApiEndpointGet<unknown, unknown, unknown>
  | ApiEndpointPost<unknown, unknown, unknown>
  | ApiEndpointPut<unknown, unknown, unknown>
  | ApiEndpointDelete<unknown, unknown>;

type Repository<T extends Record<string, Endpoint>> = {
  [K in keyof T]: T[K] extends ApiEndpointGet<infer R, infer Q, infer P>
    ? (queryParams?: Q, pathParams?: P) => Promise<R>
    : T[K] extends ApiEndpointPost<infer R, infer B, infer P>
      ? (body: B, pathParams?: P) => Promise<R>
      : T[K] extends ApiEndpointPut<infer R, infer B, infer P>
        ? (body: B, pathParams?: P) => Promise<R>
        : T[K] extends ApiEndpointDelete<infer R, infer P>
          ? (pathParams?: P) => Promise<R>
          : never;
};

export const createRepository = <T extends Record<string, Endpoint>>(
  endpoints: T,
): Repository<T> => {
  return Object.entries(endpoints).reduce((acc, [key, value]) => {
    if (value.method === 'GET') {
      //@ts-expect-error No pasada nada home
      acc[key] = async (
        queryParams?: Parameters<typeof get>[0]['queryParams'],
        pathParams?: Parameters<typeof get>[0]['pathParams'],
      ) =>
        get({
          ...value,
          queryParams,
          pathParams,
        });
    }

    if (value.method === 'POST') {
      //@ts-expect-error No pasada nada home
      acc[key] = async (
        body: Parameters<typeof post>[0]['body'],
        pathParams?: Parameters<typeof post>[0]['pathParams'],
      ) => post({ ...value, body, pathParams });
    }

    if (value.method === 'PUT') {
      //@ts-expect-error No pasada nada home
      acc[key] = async (
        body: Parameters<typeof put>[0]['body'],
        pathParams?: Parameters<typeof put>[0]['pathParams'],
      ) => put({ ...value, body, pathParams });
    }
    if (value.method === 'DELETE') {
      //@ts-expect-error No pasada nada home
      acc[key] = async (pathParams?: Parameters<typeof del>[0]['pathParams']) =>
        del({ ...value, pathParams });
    }

    return acc;
  }, {} as Repository<T>);
};
