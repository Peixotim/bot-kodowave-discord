import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  ComponentType,
} from "discord.js";
import { Command } from "../../types";

function page1Home(ping: number, avatarURL: string | undefined): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0x1db954)
    .setAuthor({ name: "KodoWave Music Bot", iconURL: avatarURL })
    .setTitle("🎵  Bem-vindo ao KodoWave")
    .setDescription(
      "O bot de música mais completo do seu servidor.\n" +
        "Suporte a **YouTube**, **Spotify** e **SoundCloud**\n" +
        "com qualidade de áudio premium.\n\u200b",
    )
    .addFields(
      {
        name: "⚡  Início rápido",
        value:
          "**1.** Entre em um canal de voz\n" +
          "**2.** Use `/play` com uma URL\n" +
          "**3.** O bot entra e começa a tocar\n\u200b",
        inline: false,
      },
      { name: "📦  Versão", value: "`1.0.0`", inline: true },
      {
        name: "🌐  Plataformas",
        value: "YT • Spotify • SoundCloud",
        inline: true,
      },
      { name: "🏓  Latência", value: `\`${ping}ms\``, inline: true },
    )
    .setFooter({ text: "KodoWave  •  Página 1 de 6  •  Use ← → para navegar" })
    .setTimestamp();
}

function page2Commands(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle("📋  Comandos de Reprodução")
    .setDescription("Controle total da música com slash commands.\n\u200b")
    .addFields(
      {
        name: "▶️  `/play [url]`",
        value:
          "Toca uma música ou adiciona à fila.\nAceita URLs do YouTube, Spotify e SoundCloud.\n\u200b",
        inline: false,
      },
      {
        name: "⏭️  `/skip`",
        value:
          "Pula para a próxima música da fila.\nSe não houver próxima, a fila é encerrada.\n\u200b",
        inline: false,
      },
      {
        name: "⏸️  `/pause`",
        value: "Pausa a música atual. Use novamente para retomar.\n\u200b",
        inline: false,
      },
      {
        name: "⏹️  `/stop`",
        value: "Para a reprodução e limpa toda a fila.\n\u200b",
        inline: false,
      },
    )
    .setFooter({ text: "KodoWave  •  Página 2 de 6  •  Use ← → para navegar" });
}

function page3Queue(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0xeb459e)
    .setTitle("📊  Gerenciamento de Fila")
    .setDescription("Controle o que está na fila de reprodução.\n\u200b")
    .addFields(
      {
        name: "🗒️  `/queue`",
        value:
          "Mostra as próximas músicas na fila.\nExibe até 10 músicas por vez com duração.\n\u200b",
        inline: false,
      },
      {
        name: "📌  Como a fila funciona",
        value:
          "• Cada `/play` adiciona ao final da fila\n" +
          "• A música atual aparece no topo marcada com ▶️\n" +
          "• Ao terminar, a próxima começa automaticamente\n" +
          "• O bot desconecta quando a fila esvazia\n\u200b",
        inline: false,
      },
      {
        name: "💡  Dica",
        value:
          "Adicione várias músicas antes de entrar no canal\npara criar uma playlist instantânea.\n\u200b",
        inline: false,
      },
    )
    .setFooter({ text: "KodoWave  •  Página 3 de 6  •  Use ← → para navegar" });
}

function page4Platforms(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle("🌐  Plataformas Suportadas")
    .setDescription("Cole a URL diretamente no `/play`.\n\u200b")
    .addFields(
      {
        name: "▶️  YouTube",
        value:
          "✅ `youtube.com/watch?v=...`\n" +
          "✅ `youtu.be/...`\n" +
          "✅ Playlists completas\n\u200b",
        inline: false,
      },
      {
        name: "💚  Spotify",
        value:
          "✅ `open.spotify.com/track/...`\n" +
          "✅ `open.spotify.com/playlist/...`\n" +
          "✅ `open.spotify.com/album/...`\n\u200b",
        inline: false,
      },
      {
        name: "🟠  SoundCloud",
        value:
          "✅ `soundcloud.com/artista/musica`\n" +
          "✅ Playlists do SoundCloud\n\u200b",
        inline: false,
      },
    )
    .setFooter({ text: "KodoWave  •  Página 4 de 6  •  Use ← → para navegar" });
}

function page5Tips(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0xfee75c)
    .setTitle("💡  Dicas & Problemas Comuns")
    .setDescription("Tire o máximo proveito do KodoWave.\n\u200b")
    .addFields(
      {
        name: "🎯  Performance",
        value:
          "• Use URLs diretas para resultados mais rápidos\n" +
          "• Playlists grandes demoram mais para carregar\n" +
          "• Prefira YouTube para maior estabilidade\n\u200b",
        inline: false,
      },
      {
        name: "🔇  Problemas comuns",
        value:
          "• **Bot não entra** → Verifique se está em canal de voz\n" +
          "• **Música não toca** → Tente outra URL\n" +
          "• **Timeout** → URL pode estar indisponível\n" +
          "• **Erro Spotify** → Use a URL completa da faixa\n\u200b",
        inline: false,
      },
      {
        name: "⚡  Atalhos úteis",
        value:
          "• `/pause` funciona como toggle — pausa e retoma\n" +
          "• `/stop` limpa tudo de uma vez\n" +
          "• `/skip` com 1 música encerra a fila\n\u200b",
        inline: false,
      },
    )
    .setFooter({ text: "KodoWave  •  Página 5 de 6  •  Use ← → para navegar" });
}

function page6About(avatarURL: string | undefined): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0x2b2d31)
    .setAuthor({ name: "KodoWave Music Bot", iconURL: avatarURL })
    .setTitle("👾  Sobre o KodoWave")
    .setDescription(
      "KodoWave é um bot de música desenvolvido com\n" +
        "**Discord.js**, **DisTube** e **TypeScript**.\n\u200b",
    )
    .addFields(
      {
        name: "🛠️  Stack",
        value:
          "`discord.js v14`  `distube v5`  `typescript`  `node.js`\n\u200b",
        inline: false,
      },
      {
        name: "🎵  Motor de áudio",
        value: "DisTube v5 com suporte a múltiplas plataformas\n\u200b",
        inline: false,
      },
      {
        name: "👨‍💻  Desenvolvido por",
        value: "**Peixotim**\n\u200b",
        inline: true,
      },
      {
        name: "📜  Versão",
        value: "`1.0.0`\n\u200b",
        inline: true,
      },
    )
    .setFooter({
      text: "KodoWave  •  Página 6 de 6  •  Obrigado por usar o KodoWave!",
    })
    .setTimestamp();
}

function getPages(ping: number, avatarURL?: string): EmbedBuilder[] {
  return [
    page1Home(ping, avatarURL),
    page2Commands(),
    page3Queue(),
    page4Platforms(),
    page5Tips(),
    page6About(avatarURL),
  ];
}

function buildButtons(current: number, total: number) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("guide_prev")
      .setLabel("← Anterior")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(current === 0),

    new ButtonBuilder()
      .setCustomId("guide_indicator")
      .setLabel(`${current + 1} / ${total}`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true),

    new ButtonBuilder()
      .setCustomId("guide_next")
      .setLabel("Próximo →")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(current === total - 1),
  );
}

export default {
  data: new SlashCommandBuilder()
    .setName("guide")
    .setDescription("Guia completo do KodoWave"),

  async execute(interaction: ChatInputCommandInteraction) {
    const avatarURL = interaction.client.user?.displayAvatarURL();
    const pages = getPages(interaction.client.ws.ping, avatarURL);
    let current = 0;

    const reply = await interaction.reply({
      embeds: [pages[current]],
      components: [buildButtons(current, pages.length)],
      fetchReply: true,
    });

    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 5 * 60 * 1000,
      filter: (i) => i.user.id === interaction.user.id,
    });

    collector.on("collect", async (i: ButtonInteraction) => {
      if (i.customId === "guide_prev") current--;
      if (i.customId === "guide_next") current++;

      await i.update({
        embeds: [pages[current]],
        components: [buildButtons(current, pages.length)],
      });
    });

    collector.on("end", async () => {
      await interaction.editReply({
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
              .setCustomId("guide_prev_off")
              .setLabel("← Anterior")
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(true),
            new ButtonBuilder()
              .setCustomId("guide_indicator_off")
              .setLabel("Expirado — use /guide")
              .setStyle(ButtonStyle.Danger)
              .setDisabled(true),
            new ButtonBuilder()
              .setCustomId("guide_next_off")
              .setLabel("Próximo →")
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(true),
          ),
        ],
      });
    });
  },
} satisfies Command;
