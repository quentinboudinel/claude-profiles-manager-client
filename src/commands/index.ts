import type { Command } from "./types.ts";

/**
 * Registry of all `cpm` subcommands.
 *
 * Local (Milestone 2):   init, list, create, capture, switch, show, delete
 * Server (Milestone 5+): login, logout, whoami, push, pull, remote, share
 *
 * Commands are registered here as they are implemented.
 */
const registry: Command[] = [];

export const commands: ReadonlyMap<string, Command> = new Map(registry.map((c) => [c.name, c]));
