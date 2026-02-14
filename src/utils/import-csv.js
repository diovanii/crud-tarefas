import fs from "node:fs";
import { parse } from "csv-parse";

async function readCSV() {
  const parser = fs.createReadStream("./multi-tasks.csv").pipe(
    parse({
      columns: true,
      trim: true,
    }),
  );

  for await (const task of parser) {
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
      }),
    });
  }
}

readCSV();
