import {
  Collection,
  SlashCommandBuilder,
  ClientEvents,
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface BotEvent {
  name: keyof ClientEvents;
  once: boolean;
  execute: (...args: any[]) => void;
}

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}
