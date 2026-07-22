#!/usr/bin/env bun
import pkg from "../package.json" with { type: "json" };
import { commands } from "./commands/index.ts";

function printUsage(): void {
  console.log(`cpm ${pkg.version} — manage & sync Claude Code profiles

Usage:
  cpm <command> [options]

Commands:`);
  if (commands.size === 0) {
    console.log("  (none yet — see Milestone 2)");
  } else {
    const width = Math.max(...[...commands.keys()].map((n) => n.length));
    for (const cmd of commands.values()) {
      console.log(`  ${cmd.name.padEnd(width)}  ${cmd.summary}`);
    }
  }
  console.log(`
Global options:
  -v, --version   Print version
  -h, --help      Show this help`);
}

export async function main(argv: string[]): Promise<number> {
  const [first, ...rest] = argv;

  if (first === undefined || first === "-h" || first === "--help") {
    printUsage();
    return 0;
  }
  if (first === "-v" || first === "--version") {
    console.log(pkg.version);
    return 0;
  }

  const command = commands.get(first);
  if (command === undefined) {
    console.error(`cpm: unknown command '${first}'\n`);
    printUsage();
    return 1;
  }

  return await command.run(rest);
}

if (import.meta.main) {
  process.exit(await main(process.argv.slice(2)));
}
