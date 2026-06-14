#!/usr/bin/env node
import { buildArenaRanking } from "../arena/store.js";

const area = process.argv.includes("--area")
  ? process.argv[process.argv.indexOf("--area") + 1]
  : process.argv[2] || null;

const ranking = buildArenaRanking({ area });
console.log(JSON.stringify(ranking, null, 2));
