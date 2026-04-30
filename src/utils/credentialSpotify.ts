import { z } from "zod";
import "dotenv/config";

const spotifySchema = z.object({
  SPOTIFY_CLIENT_ID: z.string().min(1, "CONFIGURE O SPOTIFY_CLIENT_ID"),
  SPOTIFY_CLIENT_SECRET: z.string().min(1, "CONFIGURE O SECRET DO SPOTIFY"),
});

export const spotifyEnv = spotifySchema.parse(process.env);
