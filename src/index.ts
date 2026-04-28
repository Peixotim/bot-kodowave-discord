import client from "./client";
import { loadCommands } from "./commands";
import { loadEvents } from "./events";
import { token } from "./utils/token";

loadEvents(client);
loadCommands(client);
client.login(token);
