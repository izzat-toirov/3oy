import { z } from 'zod';
export const matchFixtureSchema = z.object({
    match_date: z.string(),
    venue: z.string().min(1).max(100),
    home_team_id: z.number().int(),
    away_team_id: z.number().int(),
    home_score: z.number().int().min(0),
    away_score: z.number().int().min(0),
    tournament_id: z.number().int(),
    match_status: z.enum(['Scheduled', 'Ongoing', 'Completed', 'Postponed', 'Cancelled']).or(z.string().min(1).max(20))
  });
  