import DisTube, { Queue, Song, Events } from "distube";
import SpotifyPlugin from "@distube/spotify";
import SoundCloudPlugin from "@distube/soundcloud";
import { YtDlpPlugin } from "@distube/yt-dlp";
import client from "../client";
import { EmbedBuilder } from "discord.js";
import { soundcloudEnv } from "../utils/credentialsSoundCloud";
import { spotifyEnv } from "../utils/credentialSpotify";

const distube = new DisTube(client, {
  plugins: [
    new SpotifyPlugin({
      api: {
        clientId: spotifyEnv.SPOTIFY_CLIENT_ID,
        clientSecret: spotifyEnv.SPOTIFY_CLIENT_SECRET,
      },
    }),
    new SoundCloudPlugin({
      clientId: soundcloudEnv.SOUNDCLOUD_CLIENT_ID,
      oauthToken: soundcloudEnv.SOUNDCLOUD_OAUTH_TOKEN,
    }),
    new YtDlpPlugin({
      update: false,
    }),
  ],
});

const THEME = {
  PLAYING: 0x000000,
  ADDED: 0xffffff,
  ERROR: 0xff3b30,
  SUCCESS: 0x34c759,
};

distube
  .on(Events.PLAY_SONG, (queue: Queue, song: Song) => {
    const embed = new EmbedBuilder()
      .setColor(THEME.PLAYING)
      .setAuthor({
        name: "BOT AURA + EGO VULGO: KODOWAVE",
        iconURL:
          "https://preview.redd.it/toji-fushiguro-v0-orvdluty6eqb1.jpg?width=1080&crop=smart&auto=webp&s=b9857a9f5442a7c99499d101a1b88d9c579e984b",
      })
      .setTitle(song.name!)
      .setURL(song.url!)
      .setDescription(
        `⏱ **Duração:** \`${song.formattedDuration}\`\n👤 **Pedido por:** ${song.user}`,
      )
      .setImage(song.thumbnail ?? null)
      .setFooter({
        text: `KodoWave Premium Experience • Fila: ${queue.songs.length} músicas`,
      })
      .setTimestamp();

    queue.textChannel?.send({ embeds: [embed] });
  })
  .on(Events.ADD_SONG, (queue: Queue, song: Song) => {
    const embed = new EmbedBuilder()
      .setColor(THEME.ADDED)
      .setAuthor({ name: "✓ Adicionado à Playlist" })
      .setDescription(`**[${song.name}](${song.url})**`)
      .setThumbnail(song.thumbnail ?? null)
      .setDescription(
        `⏱ **Duração:** \`${song.formattedDuration}\` | 🔢 **Posição:** \`#${queue.songs.length}\``,
      )
      .setFooter({ text: "KodoWave Music" });

    queue.textChannel?.send({ embeds: [embed] });
  })
  .on(Events.ERROR, (error: Error, queue: Queue) => {
    const embed = new EmbedBuilder()
      .setColor(THEME.ERROR)
      .setTitle("⚠️ Falha na Reprodução")
      .setDescription(`\`\`\`${error.message.substring(0, 2000)}\`\`\``)
      .setFooter({ text: "Sistema de Auto-Recuperação Ativo" });
    queue.textChannel?.send({ embeds: [embed] });
    console.log(`Mensagem de erro : ${error.message}`);
    console.log(`Erro completo : ${error}`);
  });

export default distube;
