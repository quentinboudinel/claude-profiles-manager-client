/** A single `cpm` subcommand. */
export interface Command {
  /** Invocation name, e.g. "switch". */
  readonly name: string;
  /** One-line description shown in `cpm --help`. */
  readonly summary: string;
  /**
   * Run the command with the args that follow the command name.
   * Return an exit code (0 = success).
   */
  run(args: string[]): Promise<number> | number;
}
