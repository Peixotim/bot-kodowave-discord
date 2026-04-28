import { Client } from "discord.js";
import interactionCreate from "./interactionCreate";
import ready from "./ready";
import client from "@/client";
import { BotEvent } from "@/types";

const events: BotEvent[] = [ready, interactionCreate];

export function loadEvents(client: Client) {
  for (const event of events) {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }

  console.log(`${events.length} eventos carregados.`);
}
