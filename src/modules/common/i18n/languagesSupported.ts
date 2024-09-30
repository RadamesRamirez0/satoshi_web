export const languagesSupported = ['en', 'es'] as const;

export type LanguagesSupportedType = (typeof languagesSupported)[number];
