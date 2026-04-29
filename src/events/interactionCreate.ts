import distube from "../managers/MusicManager";
import { BotEvent } from "../types";
import { Events, Interaction } from "discord.js";

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.log(`Command ${interaction.commandName} is not found`);
      return;
    }

    try {
      await command.execute(interaction, distube);
    } catch (error) {
      console.error(error);

      const errorMessage = "Ocorreu um erro ao executar esse comando.";

      if (interaction.deferred) {
        await interaction.editReply({ content: errorMessage });
      } else if (interaction.replied) {
        await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    }
  },
} satisfies BotEvent;
