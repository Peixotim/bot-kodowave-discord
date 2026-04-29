import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { DisTube } from "distube";
import { Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pausa ou retoma a música"),

  async execute(interaction: ChatInputCommandInteraction, distube: DisTube) {
    const guild = interaction.guildId;
    if (!guild) {
      await interaction.reply(
        "O comando só pode ser executado em um servidor!",
      );
      return;
    }

    const queue = distube.getQueue(guild);
    if (!queue) {
      await interaction.reply({
        content: "Não há música tocando!",
        ephemeral: true,
      });
      return;
    }

    if (queue.paused) {
      queue.resume();
      await interaction.reply("▶️ Música retomada!");
    } else {
      queue.pause();
      await interaction.reply("⏸️ Música pausada!");
    }
  },
} satisfies Command;
