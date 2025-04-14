import { z } from 'zod';
export const teamSchema = z.object({
    team_name: z.string().min(1).max(100),
    club_id: z.number().int().positive(),
    group_id: z.number().int().positive().nullable(),
    coach_name: z.string().min(1).max(100),
  });
  