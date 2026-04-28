import { Client, Collection, GatewayIntentBits } from "discord.js";
import "./types";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Eventos de servidor
    GatewayIntentBits.GuildVoiceStates, // Entrar / Sair do canal de voz
    GatewayIntentBits.GuildMessages, // Mensagens no servidor
  ],
});

client.commands = new Collection();

export default client;
