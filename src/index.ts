import client from "./client";
import { loadCommands } from "./commands";
import { loadEvents } from "./events";
import { DISCORD_TOKEN } from "./utils/token";

loadEvents(client);
loadCommands(client);
client.login(DISCORD_TOKEN);

process.on("SIGINT", async () => {
  console.log("Desligando bot...");
  client.voice.adapters.forEach((adapter) => adapter.destroy());
  client.destroy();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Desligando bot...");
  client.voice.adapters.forEach((adapter) => adapter.destroy());
  client.destroy();
  process.exit(0);
});

process.on("unhandledRejection", (error: Error) => {
  console.error("Erro não tratado:", error.message);
});

process.on("uncaughtException", (error: Error) => {
  console.error("Exceção não capturada:", error);
});
