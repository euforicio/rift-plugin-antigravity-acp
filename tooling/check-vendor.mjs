import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
const provenance = JSON.parse(await readFile(new URL("./vendor/plugin-build-provenance.json", import.meta.url)));
for (const [file, expected] of [
  [new URL("../vendor/riftlabs-plugin-sdk-0.4.48.tgz", import.meta.url), "64a9dd34e7d811bb4dbfb8cc0d846a81be45c4de9825a68a2d8e9c50b20b9d7e"],
  [new URL(`./vendor/${provenance.bundle}`, import.meta.url), provenance.sha256],
]) {
  const actual = createHash("sha256").update(await readFile(file)).digest("hex");
  if (actual !== expected) throw new Error(`Checksum mismatch: ${file}`);
}
console.log("Vendor checksums verified");
