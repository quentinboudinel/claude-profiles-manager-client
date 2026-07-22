import { describe, expect, spyOn, test } from "bun:test";
import pkg from "../package.json" with { type: "json" };
import { main } from "../src/cli.ts";

describe("cli dispatch", () => {
  test("--version prints the version and exits 0", async () => {
    const log = spyOn(console, "log").mockImplementation(() => {});
    const code = await main(["--version"]);
    expect(code).toBe(0);
    expect(log).toHaveBeenCalledWith(pkg.version);
    log.mockRestore();
  });

  test("--help exits 0 and prints usage", async () => {
    const log = spyOn(console, "log").mockImplementation(() => {});
    const code = await main(["--help"]);
    expect(code).toBe(0);
    expect(log.mock.calls.flat().join("\n")).toContain("Usage:");
    log.mockRestore();
  });

  test("no args shows usage and exits 0", async () => {
    const log = spyOn(console, "log").mockImplementation(() => {});
    const code = await main([]);
    expect(code).toBe(0);
    log.mockRestore();
  });

  test("unknown command exits 1", async () => {
    const log = spyOn(console, "log").mockImplementation(() => {});
    const err = spyOn(console, "error").mockImplementation(() => {});
    const code = await main(["definitely-not-a-command"]);
    expect(code).toBe(1);
    expect(err.mock.calls.flat().join("\n")).toContain("unknown command");
    log.mockRestore();
    err.mockRestore();
  });
});
