export const formatQueryParams = (
  params?: Record<string, string | undefined>,
): string => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }

  const cleanedParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }

      return acc;
    },
    {} as Record<string, string>,
  );

  const urlParams = new URLSearchParams(cleanedParams);

  return `?${urlParams.toString()}`;
};

export const formatPathParams = (
  url: string,
  params?: Record<string, string | undefined>,
): string => {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  let newUrl = url;
  Object.entries(params).forEach(([param, value]) => {
    newUrl = newUrl.replace(`{${param}}`, value ?? '');
  });

  return newUrl;
};
