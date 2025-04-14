import { z } from 'zod';
export const playerSchema = z.object({
    full_name: z.string().min(1).max(100),
    date_of_birth: z.string(),
    position: z.string().min(1).max(50),
    team_id: z.number().int().positive(),
    jersey_number: z.number().int().min(1).max(99).optional(),
  });
  