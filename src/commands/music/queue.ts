import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { DisTube } from "distube";
import { Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Mostra as músicas na fila"),

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

    const songs = queue.songs.slice(0, 10);
    const list = songs
      .map((song, index) => {
        const prefix = index === 0 ? "▶️" : `\`${index}.\``;
        return `${prefix} **${song.name}** — *${song.formattedDuration}*`;
      })
      .join("\n");

    const embed = new EmbedBuilder()
      .setColor(0x000000)
      .setTitle("🎼 Fila de Reprodução")
      .setDescription(list)
      .addFields({
        name: "📊 Status",
        value: `Total de músicas: \`${queue.songs.length}\` | Duração total: \`${queue.formattedDuration}\``,
      })
      .setFooter({ text: "KodoWave Premium" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
} satisfies Command;
