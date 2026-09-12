import z from 'zod';

// Get Google Authorize Url
export const GetGoogleAuthorizeUrlResSchema = z.object({
  url: z.url(),
});

// Google Authorize Callback
export const GoogleAuthorizeCallbackQuerySchema = z.object({
  code: z.string(),
});

export const GoogleAuthorizeCallbackResSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

export type GetGoogleAuthorizeUrlResType = z.infer<typeof GetGoogleAuthorizeUrlResSchema>;
export type GoogleAuthorizeCallbackQueryType = z.infer<typeof GoogleAuthorizeCallbackQuerySchema>;
export type GoogleAuthorizeCallbackResType = z.infer<typeof GoogleAuthorizeCallbackResSchema>;
