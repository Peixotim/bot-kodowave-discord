import { Command } from "@/types";
import { Client } from "discord.js";
import play from "./music/play";
import skip from "./music/skip";
import pause from "./music/pause";
import queue from "./music/queue";
import stop from "./music/stop";
import guide from "./music/guide";

const commands: Command[] = [play, skip, pause, queue, stop, guide];

export function loadCommands(client: Client) {
  for (const command of commands) {
    client.commands.set(command.data.name, command);
  }

  console.log(`${commands.length} commands carregados!`);
}
