import z from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

const parsedEnv = configSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parsedEnv.success) {
  console.error(parsedEnv.error.message);
  throw new Error('Invalid environment variables');
}

const envConfig = parsedEnv.data;

export default envConfig;
