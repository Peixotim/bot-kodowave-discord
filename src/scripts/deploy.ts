import skip from "../commands/music/skip";
import play from "../commands/music/play";
import { Command } from "../types";
import { CLIENT_ID, DISCORD_TOKEN } from "../utils/token";
import { REST, Routes } from "discord.js";
import pause from "../commands/music/pause";
import queue from "../commands/music/queue";
import stop from "../commands/music/stop";
import guide from "../commands/music/guide";
import loop from "../commands/music/loop";
import "dotenv/config";

const commands: Command[] = [play, skip, pause, queue, stop, guide, loop];
const rest: REST = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

async function deploy() {
  try {
    console.log(`Register slash commands ...`);
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands.map((command) => command.data.toJSON()),
    });
    console.log("Slash commands registrados com sucesso!");
  } catch (error) {
    console.error(error);
  }
}

deploy();
