import { BotEvent } from "@/types";
import { Events, Interaction } from "discord.js";
import { error } from "node:console";

export default {
  name: Events.InteractionCreate,
  once: false,
  execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.log(`Command ${interaction.commandName} is not found`);
      return;
    }

    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply(`An error occurred while executing this command.`);
    }
  },
} satisfies BotEvent;
