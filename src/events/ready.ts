import { BotEvent } from "@/types";
import { Client, Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`Bot online with ${client.user?.tag}`);
  },
} satisfies BotEvent;
