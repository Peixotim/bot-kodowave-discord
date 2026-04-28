import { Command } from "@/types";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toca uma música no canal de voz")
    .addStringOption((option) =>
      option.setName("url").setDescription("URL da Musica").setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const url = interaction.options.getString("url", true);
    await interaction.reply(`Recived url : ${url}`);
  },
} satisfies Command;
