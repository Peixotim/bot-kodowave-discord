import {
  ChatInputCommandInteraction,
  GuildMember,
  GuildTextBasedChannel,
  SlashCommandBuilder,
} from "discord.js";
import { DisTube, RepeatMode } from "distube";
import { withTimeout } from "../../utils/withTimeout";
import { Command } from "@/types";
export default {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Adiciona uma musica em loop"),

  async execute(interaction: ChatInputCommandInteraction, distube: DisTube) {
    const member = interaction.member as GuildMember;
    const memberIsVoiceChannel = member.voice.channel;
    const guild = interaction.guildId;

    if (!memberIsVoiceChannel) {
      await interaction.reply(
        "Voce nao esta conectado a um canal de voice se conecte primeiro",
      );
      return;
    }

    if (!guild) {
      await interaction.reply(
        "O comando só pode ser executado em um servidor!",
      );
      return;
    }

    const queue = distube.getQueue(guild);

    //Feat adicionar um button de redirecionamento para que a pessoa possa adicionar uma url e apartir disto tocar a musica
    //Ou Adicionar uma url em loop
    if (!queue) {
      await interaction.reply({
        content: "Não há música tocando!",
        ephemeral: true,
      });
      return;
    }

    const nextMode = (queue.repeatMode + 1) % 3;
    queue.setRepeatMode(nextMode);

    const modeLabels: Record<number, string> = {
      [RepeatMode.DISABLED]: "🔁  Loop **desativado**",
      [RepeatMode.SONG]: "🔂  Repetindo **música atual**",
      [RepeatMode.QUEUE]: "🔁  Repetindo **fila inteira**",
    };

    await interaction.reply(modeLabels[nextMode]);
  },
} satisfies Command;
