import * as readline from "readline";
import * as clipboardy from "clipboardy";
import * as dotenv from "dotenv";
import axios from "axios";
import { uniqBy } from "lodash";

import { TogglResponse, TogglResponseData } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", () => {
  process.exit(0);
});

const getTogglResponse = async (workspaceId: string, token: string) => {
  const src = `https://api.track.toggl.com/reports/api/v2/details?workspace_id=${workspaceId}&user_agent=toggl_report_script`;

  const headers = {
    Authorization: `Basic ${Buffer.from(`${token}:api_token`, "utf8").toString(
      "base64"
    )}`,
  };

  const response = await axios.get<TogglResponse>(src, {
    headers,
    responseType: "json",
  });
  return response.data;
};

const getUniqEntriesDetail = (entries: Array<TogglResponseData>) => {
  const uniqEntries = uniqBy(entries, "description");
  return uniqEntries.map((entry) => entry.description);
};

const showReport = (totalHours: string, entries: Array<string>) => {
  console.log("This is your report:\n\n");

  const report = `${totalHours}h\n${entries.map(
    (entryDetail) => `\n${entryDetail}`
  )}`;
  console.log(report);

  clipboardy.writeSync(report);
  console.log("\n\nYour report has been copied to you clipboard!");
  console.log("Goodbye 👋");
};

const init = () => {
  console.clear();
  dotenv.config();
};

const main = async () => {
  init();

  const token = process.env.TOGGL_TOKEN;
  const workspaceId = process.env.WORKSPACE_ID;

  const togglResponse = await getTogglResponse(workspaceId, token);

  const totalHours = Math.floor(togglResponse.total_grand / 3600000).toFixed(0);
  const uniqEntriesDetail = getUniqEntriesDetail(togglResponse.data);

  showReport(totalHours, uniqEntriesDetail);

  process.exit(0);
};

main();
