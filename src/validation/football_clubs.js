import { z } from 'zod';

export const footballClubSchema = z.object({
    club_name: z.string().min(1).max(100),
    city: z.string().min(1).max(100),
    country: z.string().min(1).max(100),
    founded_year: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
  });
  