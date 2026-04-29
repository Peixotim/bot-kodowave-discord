import {
  Collection,
  SlashCommandBuilder,
  ClientEvents,
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import DisTube from "distube";

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (
    interaction: ChatInputCommandInteraction,
    distube: DisTube,
  ) => Promise<void>;
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
