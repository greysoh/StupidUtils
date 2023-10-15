import { readFile } from "node:fs/promises";

import { tcp } from "./modules/tcp.mjs";
import { udp } from "./modules/udp.mjs";

const config = JSON.parse(await readFile("./config.json").catch((e) => {
  console.error("Config not found! Have you copied config.example.json?");
  process.exit(1);
}));

for (const forwardEntry of config) {
  switch (forwardEntry.type) {
    default: {
      console.error("Unsupported protocol:", forwardEntry.type);
      break;
    }

    case "TCP": {
      tcp(forwardEntry);
      break;
    }

    case "UDP": {
      udp(forwardEntry);
      break;
    }
  }
}