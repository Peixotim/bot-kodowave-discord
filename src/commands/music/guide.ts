import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("guide")
    .setDescription("Guia completo do KodoWave"),

  async execute(interaction: ChatInputCommandInteraction) {
    const mainEmbed = new EmbedBuilder()
      .setColor(0x1db954)
      .setAuthor({
        name: "KodoWave Music Bot",
        iconURL: interaction.client.user?.displayAvatarURL(),
      })
      .setTitle("🎵  Bem-vindo ao KodoWave")
      .setDescription(
        "O bot de música mais completo do seu servidor.\n" +
          "Suporte a **YouTube**, **Spotify** e **SoundCloud** com qualidade de áudio premium.\n\n" +
          "Use os botões abaixo para navegar pelo guia.",
      )
      .setImage("https://i.imgur.com/AfFp7pu.png") // placeholder — troque pela sua banner
      .addFields(
        {
          name: "⚡  Início rápido",
          value:
            "1. Entre em um canal de voz\n" +
            "2. Use `/play` com uma URL ou nome\n" +
            "3. O bot entra e começa a tocar",
          inline: false,
        },
        {
          name: "📦  Versão",
          value: "`1.0.0`",
          inline: true,
        },
        {
          name: "🌐  Plataformas",
          value: "YouTube • Spotify • SoundCloud",
          inline: true,
        },
        {
          name: "🏓  Latência",
          value: `\`${interaction.client.ws.ping}ms\``,
          inline: true,
        },
      )
      .setFooter({
        text: "KodoWave  •  /guide para ver este menu a qualquer momento",
      })
      .setTimestamp();

    const commandsEmbed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setAuthor({ name: "📋  Comandos disponíveis" })
      .addFields(
        {
          name: "🎵  Música",
          value:
            "`/play [url]` — Toca uma música ou adiciona na fila\n" +
            "`/skip` — Pula para a próxima música\n" +
            "`/pause` — Pausa ou retoma a música\n" +
            "`/stop` — Para a música e limpa a fila\n" +
            "`/queue` — Mostra a fila atual",
          inline: false,
        },
        {
          name: "ℹ️  Geral",
          value: "`/guide` — Mostra este guia\n",
          inline: false,
        },
        {
          name: "💡  Dica",
          value:
            "Você pode usar URLs do YouTube, Spotify e SoundCloud diretamente no `/play`.\n" +
            "Playlists também são suportadas!",
          inline: false,
        },
      )
      .setFooter({ text: "KodoWave  •  Todos os comandos são slash commands" });

    const tipsEmbed = new EmbedBuilder()
      .setColor(0xfee75c)
      .setAuthor({ name: "💡  Dicas & Boas práticas" })
      .addFields(
        {
          name: "🎯  Performance",
          value:
            "• Prefira URLs diretas a nomes de músicas para resultados mais rápidos\n" +
            "• Playlists grandes podem demorar um pouco para carregar\n" +
            "• O bot desconecta automaticamente quando a fila terminar",
          inline: false,
        },
        {
          name: "🔇  Problemas comuns",
          value:
            "• **Bot não entra no canal** — Verifique se você está em um canal de voz\n" +
            "• **Música não toca** — Tente com outra URL ou formato\n" +
            "• **Erro no Spotify** — Use a URL completa da faixa",
          inline: false,
        },
        {
          name: "🎵  Formatos aceitos",
          value:
            "✅ `youtube.com/watch?v=...`\n" +
            "✅ `youtu.be/...`\n" +
            "✅ `open.spotify.com/track/...`\n" +
            "✅ `soundcloud.com/...`\n" +
            "✅ Playlists de todas as plataformas",
          inline: false,
        },
      )
      .setFooter({ text: "KodoWave  •  Em caso de dúvidas use /guide" });

    await interaction.reply({
      embeds: [mainEmbed, commandsEmbed, tipsEmbed],
      ephemeral: false,
    });
  },
} satisfies Command;
