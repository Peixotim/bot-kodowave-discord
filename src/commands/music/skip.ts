import { Command } from "@/types";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { DisTube } from "distube";

export default {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pula para a proxima musica"),
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

    const songs = queue.songs.slice(0, 10);
    if (songs.length < 2) {
      await interaction.reply(
        "Nao tem mais musicas, caso queira pausar digite /stop",
      );
      return;
    }

    await queue.skip();
    await interaction.reply(`Musica Pulada !`);
  },
} satisfies Command;
