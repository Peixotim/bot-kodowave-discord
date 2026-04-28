import { Command } from "@/types";
import { Client } from "discord.js";
import play from "./music/play";

const commands: Command[] = [play];

export function loadCommands(client: Client) {
  for (const command of commands) {
    client.commands.set(command.data.name, command);
  }

  console.log(`${commands.length} commands carregados!`);
}
