import { z } from "zod";
import "dotenv/config";

const soundCloudSchema = z.object({
  SOUNDCLOUD_CLIENT_ID: z
    .string()
    .min(1, "CONFIGURE O CLIENT_ID DO SOUNDCLOUD"),
  SOUNDCLOUD_OAUTH_TOKEN: z
    .string()
    .min(1, "CONFIGURE O OAUTH_TOKEN DO SOUNDCLOUD"),
});

export const soundcloudEnv = soundCloudSchema.parse(process.env);
