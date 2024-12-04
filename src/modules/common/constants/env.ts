export const apiUrl = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL) as string;
export const secretKey = process.env.SECRET ?? '';
export const baseImage =
  process.env.BASE_URL_PROFILE ?? process.env.NEXT_PUBLIC_BASE_URL_PROFILE ?? '';
