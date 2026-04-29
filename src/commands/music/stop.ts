import { Command } from "@/types";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { DisTube } from "distube";

export default {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Para a música e limpa a fila"),
  async execute(interaction: ChatInputCommandInteraction, distube: DisTube) {
    const guild = interaction.guildId;

    if (!guild) {
      await interaction.reply(
        `O comando so pode ser executado em um servidor !`,
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

    await queue.stop();
    await interaction.reply(`Música parada e fila limpa!`);
  },
} satisfies Command;
