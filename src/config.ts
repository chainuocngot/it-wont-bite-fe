import z from 'zod';

const configSchema = z.object({
  API_URL: z.url(),
});

const parsedEnv = configSchema.safeParse({
  API_URL: process.env.API_URL,
});

if (!parsedEnv.success) {
  console.error(parsedEnv.error.message);
  throw new Error('Invalid environment variables');
}

const envConfig = parsedEnv.data;

export default envConfig;
