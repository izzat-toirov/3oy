import { z } from 'zod';

export const tournamentSchema = z.object({
  tournament_name: z.string().min(1).max(100),
  status: z.enum(['Scheduled', 'Ongoing', 'Completed', 'Cancelled']).or(z.string().min(1).max(20))
});
