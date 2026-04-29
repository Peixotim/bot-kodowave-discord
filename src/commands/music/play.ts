import { Command } from "../../types";
import {
  ChatInputCommandInteraction,
  GuildMember,
  GuildTextBasedChannel,
  SlashCommandBuilder,
} from "discord.js";
import { DisTube } from "distube";
import { withTimeout } from "../../utils/withTimout";

export default {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toca uma música no canal de voz")
    .addStringOption((option) =>
      option.setName("url").setDescription("URL da Musica").setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction, distube: DisTube) {
    const url = interaction.options.getString("url", true);
    const member = interaction.member as GuildMember;
    const memberIsVoiceChannel = member.voice.channel;

    if (!memberIsVoiceChannel) {
      await interaction.reply({
        content: "Você precisa estar em um canal de voz!",
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply();

    try {
      const textChannel = interaction.channel?.isDMBased()
        ? undefined
        : (interaction.channel as GuildTextBasedChannel | null);

      await Promise.race([
        distube.play(memberIsVoiceChannel, url, {
          textChannel: textChannel ?? undefined,
          member,
        }),
        withTimeout(15000),
      ]);

      await interaction.editReply("Processando sua música!");
    } catch (error: any) {
      console.error(error);

      if (error.message === "TIMEOUT") {
        await interaction.editReply(
          "⏱️ Demorou muito para carregar. Tente novamente com outra URL.",
        );
      } else {
        await interaction.editReply("Erro ao tocar a música!");
      }
    }
  },
} satisfies Command;
