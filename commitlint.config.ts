import type { UserConfig } from "@commitlint/types";

/** Enforce Conventional Commits. Drives release-please versioning. */
const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
};

export default config;
