import z from 'zod';

export const idZod = z.number().int().positive();
