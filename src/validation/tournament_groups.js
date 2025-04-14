import { z } from 'zod';
export const tournamentGroupSchema = z.object({
    group_name: z.string().min(1).max(100),
    tournament_id: z.number().int()
  });
  