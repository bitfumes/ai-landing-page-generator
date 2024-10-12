export const dynamic = "force-dynamic"; // static by default, unless reading the request

import fs from "fs";
import path from "path";

export function GET(request) {
  //  TODO: remove all directory and its files from app directory except those from ignore array
  const ignore = [
    "api",
    "fonts",
    "service",
    "favicon.ico",
    "globals.css",
    "layout.js",
    "page.js",
  ];
  const appDirectory = path.join(process.cwd(), "app");
  const files = fs.readdirSync(appDirectory);
  files.forEach((file) => {
    if (!ignore.includes(file)) {
      fs.rmSync(path.join(appDirectory, file), {
        recursive: true,
        force: true,
      });
    }
  });
  return new Response("OK");
}
